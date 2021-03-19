import React from "react";
import { shallow } from "enzyme";

import App from "@/components/app.js";
import HomePage from "@/pages/HomePage";
import FooterInfo from "@/components/FooterInfo";
import SingleReportApp from '../../../src/SingleReportApp'

const wrapper = shallow(<SingleReportApp />);

describe("test single report app", () => {
  test("there should be default page title", () => {
    expect(document.title).toBe("Report");
  });
});
