'use client';

import { useToast } from '@/hooks/use-toast';
import { BarChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const DiscretUniformChar: React.FC = () => {
  const { toast } = useToast();

  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(6);

  const [probability, setProbability] = useState(0);
  const [data, setData] = useState<{ category: string; value: number }[]>([]);

  const generateDiscreteUniformProbability = (min: number, max: number) => {
    if (min > max) {
      return [];
    }

    const range = max - min + 1;
    const probability = 1 / range;

    setProbability(probability);

    return Array.from({ length: range }, (_, index) => ({
      category: `${min + index}`,
      value: probability,
    }));
  };

  useEffect(() => {
    const distributionData = generateDiscreteUniformProbability(
      minValue,
      maxValue
    );

    if (!distributionData.length) {
      toast({
        title: "'a' must be less than or equal to 'b'.",
        variant: 'destructive',
      });
    }

    setData(distributionData);
  }, [minValue, maxValue, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold mb-10">{`DU(min:${minValue}, max:${maxValue}) = ${probability.toFixed(
          4
        )}`}</CardTitle>
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[200px]">Min Value:</Label>
            <Input
              type="number"
              name="minValue"
              value={minValue}
              onChange={(e) => setMinValue(Number(e.target.value))}
              min={0}
              max={maxValue}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[200px]">Max Value:</Label>
            <Input
              type="number"
              name="maxValue"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
              min={minValue}
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
          valueFormatter={(value) => value.toFixed(4)}
        />
      </CardContent>
    </Card>
  );
};
