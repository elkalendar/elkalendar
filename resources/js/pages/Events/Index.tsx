import React, {useState} from 'react';
import {BiPlus} from 'react-icons/bi';
import {Alert, Button, Flex, Group, Input, Modal, Slider, Text, TextInput,} from '@mantine/core';
import {useForm} from '@inertiajs/inertia-react';
import {BsCalendar} from 'react-icons/bs';
import {FaSave} from 'react-icons/fa';
import AppLayout from '@/layouts/AppLayout';
import {Event} from '@/types/entities';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import EventsList from '@/components/Events/EventsList';
import useTypedPage from "@/hooks/useTypedPage";
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface IndexProps {
  events: Event[];
}

export default function Dashboard(props: IndexProps) {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const page = useTypedPage();
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const headerAction = (
    <Button
      leftSection={<BiPlus/>}
      onClick={() => setCreateNewModalOpen(true)}
    >
      {t('btn.new_event')}
    </Button>
  );

  const form = useForm({
    name: '',
    slug: '',
    duration: 30,
  });

  return (
    <AppLayout
      title={t('event.events.title')}
      renderHeader={() => (
        <PageHeader
          title={t('event.events.title')}
          subtitle={t('event.events.subtitle')}
          leftSection={headerAction}
        />
      )}
    >
      <>
        <Modal
          centered
          opened={createNewModalOpen}
          onClose={() => setCreateNewModalOpen(false)}
          title={t('forms.event.new.title')}
        >
          <Flex
            direction="column"
            gap={22}
          >
            {
              page.props.errors.schedule && <Alert color='red'>{page.props.errors.schedule}</Alert>
            }

            <TextInput
              withAsterisk
              label={t('forms.event.new.name_name')}
              description={t('forms.event.new.name_desc')}
              error={form.errors.name}
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
            />

            <Group gap={6}>
              <TextInput
                w='100%'
                withAsterisk
                label={t('forms.event.new.slug_name')}
                description={t('forms.event.new.slug_desc')}
                error={form.errors.slug}
                value={form.data.slug}
                onChange={(e) => form.setData('slug', e.currentTarget.value)}
              />

              <Text size='sm'>
                {page.props.appUrl + "/" + page.props.auth.user.username + "/" + form.data.slug}
              </Text>
            </Group>


            <Input.Wrapper
              withAsterisk
              label={t('forms.event.new.duration_name')}
              description={t('forms.event.new.duration_name')}
              error={form.errors.duration}
            >
              <Slider
                label={(value) => value + ' ' + t('forms.event.new.minute')}
                min={15}
                max={120}
                step={5}
                defaultValue={30}
                onChange={(value) => form.setData('duration', value)}
              />

            </Input.Wrapper>
            <Button
              type="submit"
              onClick={() => {
                form.post('/events', {
                  preserveScroll: true,
                  data: form.data,
                  onSuccess: () => {
                    successToast();
                    setCreateNewModalOpen(false);
                  },
                });
              }}
              leftSection={<FaSave/>}
            >
              {t('btn.save')}
            </Button>
          </Flex>
        </Modal>

        {
          props.events.length < 1 ?
            <NoResults
              title={t('event.events.no_results')}
              subtitle={t('event.events.no_results_subtitle')}
              icon={<BsCalendar size="3rem"/>}
            />
            : <EventsList events={props.events}/>
        }
      </>
    </AppLayout>
  );
}
