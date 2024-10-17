'use client';

import { useToast } from '@/hooks/use-toast';
import { BarChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const DiscretUniformChar: React.FC = () => {
  const { toast } = useToast();

  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(6);

  const [probability, setProbability] = useState(0);
  const [data, setData] = useState<{ category: string; probability: number }[]>(
    []
  );

  const generateDiscreteUniformProbability = (min: number, max: number) => {
    if (min > max) {
      return [];
    }

    const range = max - min + 1;
    const probability = 1 / range;

    setProbability(probability);

    return Array.from({ length: range }, (_, index) => ({
      category: `${min + index}`,
      probability: probability,
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
        <CardTitle className="text-sm md:text-lg font-bold">
          {`DU(min:${minValue}, max:${maxValue})`}
        </CardTitle>
        <CardDescription className="font-semibol text-sm md:text-lg !mt-5 !mb-10">
          Probability of one die landing on a specific number:{' '}
          <span className="font-bold text-blue-600">
            {probability.toFixed(10)}
          </span>
        </CardDescription>
        <div className="flex justify-between items-center flex-col md:flex-row gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-sm md:text-lg w-[200px]">
              Min Value:
            </Label>
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
            <Label className="font-bold text-sm md:text-lg w-[200px]">
              Max Value:
            </Label>
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
          className="h-[250px] md:h-[500px]"
          data={data}
          index="category"
          categories={['probability']}
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
