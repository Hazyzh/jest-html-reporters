const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const {
  tempDirPath,
  dataDirPath,
  attachDirPath,
  distDirName,
  readAttachInfos,
  getOptions,
} = require("./helper");
const localTemplatePath = path.resolve(__dirname, "./dist/index.html");
const multipleLocalTemplatePath = path.resolve(
  __dirname,
  "./dist/multipleIndex.html"
);
const timeOut = (timer) => new Promise((r) => setTimeout(() => r(true), timer));

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}

function imgToBase64(imgPath) {
  const fileName = path.resolve(imgPath);
  if (fs.statSync(fileName).isFile()) {
    const fileData = fs.readFileSync(fileName).toString("base64");
    return `data:image/${fileName.split(".").pop()};base64,${fileData}`;
  }
  return undefined;
}

// for #32
const formatCustomInfo = (customInfos) => {
  if (typeof customInfos !== "string") return customInfos;

  try {
    const infos = JSON.parse(JEST_HTML_REPORTERS_CUSTOM_INFOS);
    if (infos) {
      return Object.entries(infos).map(([key, value]) => ({
        title: key,
        value,
      }));
    }
  } catch (err) {
    console.warn(
      "the value of Custom info env must be a json string point to an Object"
    );
  }
  return undefined;
};

// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = getOptions(options);
    this.init();
  }

  async onRunComplete(contexts, results) {
    const {
      publicPath,
      filename,
      logoImgPath,
      customInfos,
      multipleReportsUnitePath,
    } = this._options;
    const logoImg = logoImgPath ? imgToBase64(logoImgPath) : undefined;
    results.config = this._globalConfig;
    results.endTime = Date.now();
    results._reporterOptions = {
      ...this._options,
      logoImg,
      customInfos: formatCustomInfo(customInfos),
    };
    const attachInfos = await readAttachInfos(
      publicPath,
      multipleReportsUnitePath
    );
    results.attachInfos = attachInfos;
    fs.existsSync(publicPath) === false && publicPath && mkdirs(publicPath);

    const data = JSON.stringify(results);
    const filePath = path.resolve(publicPath, filename);
    // fs.writeFileSync('./src/devMock.json', data)
    if (!multipleReportsUnitePath) {
      const htmlTemplate = fs.readFileSync(localTemplatePath, "utf-8");
      const outPutContext = htmlTemplate.replace(
        "$resultData",
        JSON.stringify(data)
      );
      fs.writeFileSync(filePath, outPutContext, "utf-8");
      console.log("📦 reporter is created on:", filePath);
    } else {
      const multipleReportFilePath = path.resolve(
        multipleReportsUnitePath,
        "./multiple-html-unite-report.html"
      );
      fse.mkdirpSync(multipleReportsUnitePath);
      await this.addMultipleReportsData(multipleReportsUnitePath, results);
      fs.copyFileSync(multipleLocalTemplatePath, multipleReportFilePath);
      console.log("📦 reporter is created on:", multipleReportsUnitePath);
    }
    this.removeTempDir();
  }

  init() {
    this.initAttachDir();
  }

  initAttachDir() {
    this.removeTempDir();
    this.removeAttachDir();
    fse.mkdirpSync(dataDirPath);
    fse.mkdirpSync(attachDirPath);
  }

  removeTempDir() {
    fse.removeSync(tempDirPath);
  }

  removeAttachDir() {
    if (!this._options.multipleReportsUnitePath) {
      fse.removeSync(
        path.resolve(this._options.publicPath || process.cwd(), distDirName)
      );
    }
  }

  async addMultipleReportsData(multipleReportsUnitePath, data) {
    const flag = "./jest-html-reports-multiple-flag";
    const resultDataFileName = "./jest-html-reports-unite-data.json";

    const flagPath = path.resolve(multipleReportsUnitePath, flag);
    const dataPath = path.resolve(multipleReportsUnitePath, resultDataFileName);

    let hasFlag = false;
    const addHandle = async () => {
      try {
        await fse.open(flagPath, "wx");
        hasFlag = true;
      } catch (err) {
        if (err) {
          if (err.code === "EEXIST") {
            await timeOut(1000);
            return addHandle();
          } else {
            console.log(err);
            return;
          }
        }
      }
      const savedData = (await fse.pathExists(dataPath))
        ? await fse.readJson(dataPath)
        : [];
      savedData.push(data);
      try {
        await fse.writeJSON(dataPath, savedData);
        fse.removeSync(flagPath);
        hasFlag = false;
      } catch (err) {
        console.error(err);
        fse.removeSync(flagPath);
        hasFlag = false;
      }
    };
    await addHandle();

    process.on("exit", () => {
      if (hasFlag) fse.removeSync(flagPath);
    });

    process.on("SIGINT", () => {
      if (hasFlag) fse.removeSync(flagPath);
    });
  }
}

module.exports = MyCustomReporter;
