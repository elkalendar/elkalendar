import React from 'react';
import {Button, Group, Text,} from "@mantine/core";
import classes from './classes.module.css';
import OnboardingLayout from "@/layouts/OnboardingLayout";
import {Inertia} from "@inertiajs/inertia";

function Intro(props) {

  return (
    <OnboardingLayout title='البدء بالجدولة'>
      <h1 className={classes.title}>
        هنيئاً لك يا&nbsp;
        <Text component="span" variant="gradient" gradient={{from: 'blue', to: 'cyan'}} inherit>
          {props.auth.user.data.name}
        </Text>{' '}
      </h1>


      <Text className={classes.description} color="dimmed">
        لقد قمت بإستكمال جميع الخطوات الاساسية للبدء في استخدام الكالندر بنجاح.
      </Text>

      <Text className={classes.description} color="dimmed">
        نتمنى لك تجربة ممتعة ومفيدة معنا.
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
          الانتقال للوحة التحكم
        </Button>
      </Group>
    </OnboardingLayout>
  );
}

export default Intro;
