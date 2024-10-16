'use client';

import { useToast } from '@/hooks/use-toast';
import { AreaChart } from '@tremor/react';
import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const ContinuousUniformChar: React.FC = () => {
  const { toast } = useToast();

  const [valueA, setValueA] = useState<number>(300);
  const [valueB, setValueB] = useState<number>(450);
  const [valueX, setValueX] = useState<number>(400);

  const [density, setDensity] = useState<number>(0);

  const calculateDensity = (a: number, b: number, x: number): number => {
    if (x < a || x > b) {
      return 0;
    }
    return Number((1 / (b - a)).toFixed(6));
  };

  const data = useMemo(() => {
    if (valueX < valueA || valueX > valueB) {
      toast({
        title: "'x' must be between 'a' and 'b'.",
        variant: 'destructive',
      });
      return [];
    }

    const points = 100;
    const step = (valueB - valueA) / points;

    const distributionData = [];
    for (let i = 0; i <= points; i++) {
      const x = valueA + i * step;
      distributionData.push({ x, density: 1 / (valueB - valueA) });
    }

    return distributionData;
  }, [valueA, valueB, valueX, toast]);

  useEffect(() => {
    setDensity(calculateDensity(valueA, valueB, valueX));
  }, [valueA, valueB, valueX]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm md:text-lg font-bold">
          {`CU(a:${valueA}, b:${valueB})`}
        </CardTitle>
        <CardDescription className="font-semibol text-sm md:text-lg !mt-5 !mb-10">
          Probability density of producing {valueX} units:{' '}
          <span className="font-bold text-blue-600">{density.toFixed(4)}</span>
        </CardDescription>
        <div className="flex justify-between items-center flex-col md:flex-row gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-sm md:text-lg">a:</Label>
            <Input
              type="number"
              name="valueA"
              value={valueA}
              onChange={(e) => {
                setValueA(Number(e.target.value));
                setDensity(
                  calculateDensity(Number(e.target.value), valueB, valueX)
                );
              }}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-sm md:text-lg">b:</Label>
            <Input
              type="number"
              name="valueB"
              value={valueB}
              onChange={(e) => {
                setValueB(Number(e.target.value));
                setDensity(
                  calculateDensity(valueA, Number(e.target.value), valueX)
                );
              }}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-sm md:text-lg flex-1">x:</Label>
            <Input
              type="number"
              name="valueX"
              value={valueX}
              onChange={(e) => {
                setValueX(Number(e.target.value));
                setDensity(
                  calculateDensity(valueA, valueB, Number(e.target.value))
                );
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <AreaChart
          className="h-[250px] md:h-[500px]"
          data={data}
          index="x"
          categories={['density']}
          colors={['blue-500']}
          yAxisWidth={55}
          showGridLines={true}
          showAnimation={true}
          tickGap={50}
          valueFormatter={(value) => value.toFixed(4)}
        />
      </CardContent>
    </Card>
  );
};
