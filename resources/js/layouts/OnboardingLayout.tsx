import React from 'react';
import {Container, Group, rem, Stepper} from "@mantine/core";
import classes from './OnboardingLayout.module.css';
import useTypedPage from "@/hooks/useTypedPage";
import {Toaster} from "react-hot-toast";
import Confetti from "@/components/Confetti";
import {Head} from "@inertiajs/inertia-react";

interface Props {
  title?: string;
  children: React.JSX.Element;
}

export default (props: Props) => {
  const page = useTypedPage();

  return (
    <Group className={classes.wrapper}>
      <Head title={props.title}/>

      <Toaster
        position="bottom-right"
      />

      {page.props.onboarding.currentStep === 2 && <Confetti/>}

      <Container className={classes.inner}>
        <Stepper
          size='sm'
          my={rem(60)}
          active={page.props.onboarding.currentStep}
        >
          {
            page.props.onboarding.steps.map((step, index: number) => {
              return (
                <Stepper.Step
                  key={index}
                  label={step.title}
                  description={step.summary}
                />
              )
            })
          }
        </Stepper>

        {props.children}
      </Container>
    </Group>
  );
}
