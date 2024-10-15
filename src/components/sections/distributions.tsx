import { ContinuousUniformChar } from '../charts/continuous-uniform';
import { DiscretUniformChar } from '../charts/discret-uniform';
import { GammaDistributionChart } from '../charts/gamma';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const Distributions = () => {
  return (
    <section>
      <div className="container">
        <Accordion type="multiple">
          <AccordionItem value="discret-uniform">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Discret Uniform
            </AccordionTrigger>
            <AccordionContent className="py-5">
              <DiscretUniformChar />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="continuous-uniform">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Continuos Uniform
            </AccordionTrigger>
            <AccordionContent className="py-5">
              <ContinuousUniformChar />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gamma">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Gamma
            </AccordionTrigger>
            <AccordionContent className="py-5">
              <GammaDistributionChart />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
