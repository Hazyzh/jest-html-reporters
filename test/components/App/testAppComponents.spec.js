import React from "react";
import { shallow } from "enzyme";

import App from "@/components/app.js";
import HomePage from "@/pages/HomePage";
import FooterInfo from "@/components/FooterInfo";

const wrapper = shallow(<App data={{ _reporterOptions: {} }} />);

describe("test app components info", () => {
  test("there should have a home page in app", () => {
    const findHomepage = wrapper.find(HomePage);
    expect(findHomepage.length).toBe(1);
  });

  test("there should have a footer info component in app", () => {
    const findFooterInfo = wrapper.find(FooterInfo);
    expect(findFooterInfo.length).toBe(1);
  });
});
