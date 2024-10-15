'use client';

import { AreaChart } from '@tremor/react';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const ContinuousUniformChar: React.FC = () => {
  const [valueA, setValueA] = useState<number>(300);
  const [valueB, setValueB] = useState<number>(450);
  const [productionLevel, setProductionLevel] = useState<number>(400);

  const [probability, setProbability] = useState<number>(0);

  const calculateProbability = (a: number, b: number, x: number): number => {
    if (x < a || x > b) {
      return 0;
    }
    return Number((1 / (b - a)).toFixed(6));
  };

  const data = useMemo(() => {
    const points = 100;
    const step = (valueB - valueA) / points;

    const distributionData = [];
    for (let i = 0; i <= points; i++) {
      const x = valueA + i * step;
      distributionData.push({ x, pdf: 1 / (valueB - valueA) });
    }

    return distributionData;
  }, [valueA, valueB]);

  useEffect(() => {
    setProbability(calculateProbability(valueA, valueB, productionLevel));
  }, [valueA, valueB, productionLevel]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold mb-10">{`CU(a=${valueA}, b=${valueB})`}</h3>
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg">a:</Label>
            <Input
              type="number"
              name="valueA"
              value={valueA}
              onChange={(e) => {
                setValueA(Number(e.target.value));
                setProbability(
                  calculateProbability(
                    Number(e.target.value),
                    valueB,
                    productionLevel
                  )
                );
              }}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg">b:</Label>
            <Input
              type="number"
              name="valueB"
              value={valueB}
              onChange={(e) => {
                setValueB(Number(e.target.value));
                setProbability(
                  calculateProbability(
                    valueA,
                    Number(e.target.value),
                    productionLevel
                  )
                );
              }}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg flex-1">Level:</Label>
            <Input
              type="number"
              name="productionLevel"
              value={productionLevel}
              onChange={(e) => {
                setProductionLevel(Number(e.target.value));
                setProbability(
                  calculateProbability(valueA, valueB, Number(e.target.value))
                );
              }}
            />
          </div>
        </div>
        <p className="font-semibol text-lg !mt-10">
          Probability of producing {productionLevel} liters: {probability}
        </p>
      </CardHeader>
      <CardContent className="p-5">
        <AreaChart
          className="h-[500px]"
          data={data}
          index="x" // Changed to 'x' to match the data structure
          categories={['pdf']}
          colors={['blue-500']}
          yAxisWidth={70}
          showGridLines={true}
          showAnimation={true}
          tickGap={100}
        />
      </CardContent>
    </Card>
  );
};
