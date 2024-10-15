'use client';

import { useToast } from '@/hooks/use-toast';
import { AreaChart } from '@tremor/react';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const gammaPDF = (x: number, k: number, theta: number): number => {
  if (x < 0) return 0;
  const coef =
    (Math.pow(x, k - 1) * Math.exp(-x / theta)) /
    (Math.pow(theta, k) * gamma(k));
  return coef;
};

const gamma = (k: number): number => {
  if (k === 1) return 1;
  if (k === 2) return 1;
  return (k - 1) * gamma(k - 1);
};

export const GammaDistributionChart: React.FC = () => {
  const { toast } = useToast();

  const [shape, setShape] = useState<number>(2);
  const [scale, setScale] = useState<number>(2);

  const data = useMemo(() => {
    if (!shape || shape < 1) {
      toast({
        title: "'shape' must be greater than 0.",
        variant: 'destructive',
      });
      return [];
    }
    const points = 100;
    const distributionData = [];

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 20;
      const y = gammaPDF(x, shape, scale);
      distributionData.push({ x, y });
    }

    return distributionData;
  }, [shape, scale, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold !mb-10">
          {`G(k=${shape}, θ=${scale})`}
        </CardTitle>
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[180px]">Shape (k):</Label>
            <Input
              type="number"
              name="shape"
              value={shape}
              onChange={(e) => setShape(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="flex justify-start items-center gap-3 w-full">
            <Label className="font-bold text-lg w-[180px]">Scale (θ):</Label>
            <Input
              type="number"
              name="scale"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <AreaChart
          data={data}
          index="x"
          categories={['y']}
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
