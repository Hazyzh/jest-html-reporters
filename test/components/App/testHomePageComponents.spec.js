import React from "react";
import { shallow } from "enzyme";

import App from "@/components/app.js";

import { BackTop } from "antd";
import HomePage from "@/pages/HomePage";
import TableItem from "@/components/Table";
import DashBoard from "@/components/DashBoard";
import Information from "@/components/Information";
import "../../__mocks__/matchMedia.mock";

describe('test home page', () => {
  describe('via app', () => {
    const wrapper = shallow(<App data={{ _reporterOptions: {}, config: {} }} />);
    const homePage = wrapper.find(HomePage).dive();

    describe("test component info", () => {
      test("there should have a BackTop in homePage", () => {
        const homePageBackTop = homePage.find(BackTop);
        expect(homePageBackTop.length).toBe(1);
      });

      test("there should have a TableItem info in homePage component", () => {
        const homePageTableItem = homePage.find(TableItem);
        expect(homePageTableItem.length).toBe(1);
      });

      test("there should have a DashBoard info in homePage component", () => {
        const homePageDashBoard = homePage.find(DashBoard);
        expect(homePageDashBoard.length).toBe(1);
      });

      test("there should have a Information info in homePage component", () => {
        const homePageInformation = homePage.find(Information);
        expect(homePageInformation.length).toBe(1);
      });
    });

    describe("test section titles", () => {
      test("there should have three titles", () => {
        const areaSubjects = homePage.find("h3.area_subject");
        expect(areaSubjects.length).toBe(3);
      });
    });
  })

  describe("test coverage link", () => {
    test("there should a link if coverage has been activated", () => {
      const homePage = shallow(<HomePage realData={{ _reporterOptions: {}, config: { collectCoverage: true, coverageDirectory: 'test' } }} />);

      const link = homePage.find("[data-testid='coverage-link']");
      expect(link.length).toBe(1);
      expect(link.props().href).toContain('test/');
    });
  });
})
