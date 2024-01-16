import React from 'react';
import {
  CardWithChartMain,
  CardWithChartText,
  CardWithChartIcon,
  CardWithChartTitle,
  CardWithChartCount,
} from 'components/custom/card-with-chart/styles';
import { TCardWithChartProps } from 'components/custom/card-with-chart/types';
import { formatNumber } from 'utilities/extended-proto';

const CardWithChart = ({
  title,
  icon,
  count,
  ...props
}: TCardWithChartProps) => (
  <CardWithChartMain animation="zoom-in" {...props}>
    <CardWithChartText>
      <CardWithChartIcon>{icon}</CardWithChartIcon>
      <CardWithChartTitle>{title}</CardWithChartTitle>
    </CardWithChartText>
    <CardWithChartCount>
      {formatNumber(count)}
    </CardWithChartCount>
    {/* <CardWithChartValues>
      <CardWithChartCount>
        {smallIcon}
        {formatNumber(count)}
      </CardWithChartCount>
      <PercentIndicator percent={percent || 0} title={title} />
    </CardWithChartValues>
    <CardWithChartGraph>
      <LineChart
        style={{ position: 'absolute', inset: 0 }}
        data={chartData.values}
        labels={chartData.labels}
        negative={percent < 0}
      />
    </CardWithChartGraph> */}
  </CardWithChartMain>
);

export default CardWithChart;
