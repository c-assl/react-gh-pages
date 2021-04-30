import React from 'react';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./content.mdx';
import GetToflitFlowsComponent from '../../helpers';
import { getToflitFlowsByCsv } from '../../helpers/misc';

let toflitFlows1789LaRochellePartnerIsPortugal = getToflitFlowsByCsv({
  year:1789,
  customs_region:"La Rochelle",
  partner: "Portugal"
});

console.log("Result : ", toflitFlows1789LaRochellePartnerIsPortugal);

function About() {
  return (
  <div>
    <h2>À propos de ce document de synthèse</h2>
    <Content />

    <h2> Test component pour fonctions misc -- getToflitFlowsByCsv</h2>
    <GetToflitFlowsComponent result={toflitFlows1789LaRochellePartnerIsPortugal}/>
  </div>
  );
}

export default About;