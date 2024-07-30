import React from 'react';
import {Button, Group, Text,} from "@mantine/core";
import classes from './classes.module.css';
import OnboardingLayout from "@/layouts/OnboardingLayout";
import {Inertia} from "@inertiajs/inertia";
import {showSuccessToast} from "@/utils/FormHelpers";

function Intro(props) {
  return (
    <OnboardingLayout
      title='البداية'
    >
      <h1 className={classes.title}>
        أهلاً بك في&nbsp;
        <Text component="span" variant="gradient" gradient={{from: 'blue', to: 'cyan'}} inherit>
          الكالندر
        </Text>{' '}
      </h1>

      <Text className={classes.description} color="dimmed">
        سنقوم بتوجيهك خلال الخطوات التالية بإعداد حسابك لتتمكن من الحصول على الاستفادة القصوى من الكالندر.
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
                showSuccessToast('تم تحديث البيانات بنجاح')
              }
            })
          }}
        >
          البدء
        </Button>
      </Group>
    </OnboardingLayout>
  );
}

export default Intro;
