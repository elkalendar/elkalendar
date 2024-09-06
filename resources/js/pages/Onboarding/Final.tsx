import React from 'react';
import {Button, Group, Text,} from "@mantine/core";
import classes from './classes.module.css';
import OnboardingLayout from "@/layouts/OnboardingLayout";
import {Inertia} from "@inertiajs/inertia";
import {Country, OnboardingStep} from "@/types/entities";
import {useTranslation} from "react-i18next";
import useTypedPage from "@/hooks/useTypedPage";

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
  const page = useTypedPage();
  const {t} = useTranslation();

  return (
    <OnboardingLayout title={props.onboarding.steps[props.onboarding.currentStep].title}>
      <>
        <h1 className={classes.title}>
          {t('onboarding.congrats')}
          &nbsp;
          <Text component="span" variant="gradient" gradient={{from: 'blue', to: 'cyan'}} inherit>
            {page.props.auth.user.name}
          </Text>{' '}
        </h1>


        <Text className={classes.description} c="dimmed">
          {t('onboarding.final')}
        </Text>

        <Text className={classes.description} c="dimmed">
          {t('onboarding.wish')}
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{from: 'blue', to: 'cyan'}}
            onClick={() => {
              Inertia.visit('/')
            }}
          >
            {t('onboarding.go_to_dashboard')}
          </Button>
        </Group>
      </>
    </OnboardingLayout>
  );
}

export default Intro;
