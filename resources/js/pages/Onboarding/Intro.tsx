import React from 'react';
import {Button, Group, Text,} from "@mantine/core";
import classes from './classes.module.css';
import OnboardingLayout from "@/layouts/OnboardingLayout";
import {Inertia} from "@inertiajs/inertia";
import useSuccessToast from "@/hooks/useSuccessToast";
import {Country, OnboardingStep} from "@/types/entities";
import {useTranslation} from "react-i18next";

interface Props {
  countries: Country[];
  timezones: any;
  onboarding: {
    finished: boolean;
    currentStep: number;
    steps: OnboardingStep[];
  }
}

function Intro(props: Props) {
  const {t} = useTranslation();
  const successToast = useSuccessToast();

  return (
    <OnboardingLayout title={props.onboarding.steps[props.onboarding.currentStep].title}>
      <>
        <h1 className={classes.title}>
          {t('onboarding.welcome')}
          &nbsp;
          <Text component="span" variant="gradient" gradient={{from: 'blue', to: 'cyan'}} inherit>
            {t('app.name')}
          </Text>{' '}
        </h1>

        <Text className={classes.description} c='dimmed'>
          {t('onboarding.welcome_desc')}
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{from: 'blue', to: 'cyan'}}
            onClick={() => {
              Inertia.post('/onboarding/intro', {}, {
                preserveScroll: true,
                onSuccess: () => {
                  successToast()
                }
              })
            }}
          >
            {t('onboarding.start')}
          </Button>
        </Group>
      </>
    </OnboardingLayout>
  );
}

export default Intro;
