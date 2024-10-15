'use client';

import { BarChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const generateUniformProbabilityDistribution = (min: number, max: number) => {
  const range = max - min + 1;
  const probability = 1 / range;

  return Array.from({ length: range }, (_, index) => ({
    category: `${min + index}`,
    value: probability,
  }));
};

export const DiscretUniformChar: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(10);
  const [data, setData] = useState<{ category: string; value: number }[]>([]);

  useEffect(() => {
    const distributionData = generateUniformProbabilityDistribution(
      minValue,
      maxValue
    );
    setData(distributionData);
  }, [minValue, maxValue]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold mb-5">
          Discrete Uniform Distribution
        </h3>
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[200px]">Min Value:</Label>
            <Input
              type="number"
              name="minValue"
              value={minValue}
              onChange={(e) => setMinValue(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[200px]">Max Value:</Label>
            <Input
              type="number"
              name="maxValue"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
              min={0}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <BarChart
          className="h-[500px]"
          data={data}
          index="category"
          categories={['value']}
          colors={['blue-500']}
          yAxisWidth={70}
          showGridLines={true}
          showAnimation={true}
        />
      </CardContent>
    </Card>
  );
};
