# Get variable
function setParams() {
  read -p "Are you sure to publish to npm(1->yes, 2->no)" answer
    case $answer in
      "1") env="y";;
      "2") env="n";;
      *) env="n";break;;
    esac
}
# main
setParams;
if [ "$env" == "n" ];then
    echo "don't publish, exit..."
    exit 5
fi
echo "now publish this package to npm ...";
rm -rf dist/
npm run build
npm publish

# Information
echo '-----Config-----'
echo Node is $(node -v)
echo '-----dist-----'
ls dist/
