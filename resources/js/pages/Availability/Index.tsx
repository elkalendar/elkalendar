import React, {useState} from 'react';
import {
  Alert,
  Button,
  Flex,
  Modal,
} from '@mantine/core';
import {BiPlus, BiSolidError} from 'react-icons/bi';
import {Schedule} from '@/types/entities';
import useTypedPage from '@/hooks/useTypedPage';
import PageHeader from '@/components/PageHeader/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import {useTranslation} from "react-i18next";
import {NewScheduleForm} from "@/components/Forms/NewScheduleForm";
import {ScheduleCard} from "@/components/ScheduleCard";
import NoResults from "@/components/NoResults/NoResults";

interface AvailabilityProps {
  schedules: Schedule[];
}

export default function Index(props: AvailabilityProps) {
  const {t} = useTranslation();
  const page = useTypedPage();
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);

  const headerAction = (
    <Button
      leftSection={<BiPlus/>}
      component="button"
      type="button"
      onClick={() => {
        setCreateNewModalOpen(true);
      }}
    >
      {t('availability.new')}
    </Button>
  );

  return (
    <AppLayout
      title={t('availability.title')}
      renderHeader={() => (
        <PageHeader
          title={t('availability.title')}
          subtitle={t('availability.sub_title')}
          leftSection={headerAction}
        />
      )}
    >
      <>
        <Modal
          centered
          opened={createNewModalOpen}
          onClose={() => setCreateNewModalOpen(false)}
          title={t('availability.new_modal_title')}
        >
          <NewScheduleForm
            onSuccess={() => {
              setCreateNewModalOpen(false);
            }}
          />
        </Modal>

        <Flex direction="column">
          {
            page.props.errors?.scheduleError && <Alert
              title={t('alert.error')}
              color='red'
              icon={<BiSolidError/>}
              mb={22}
            >
              {page.props.errors.scheduleError}
            </Alert>
          }

          {
            props.schedules.length < 1 && <NoResults
              title={t('availability.no_result_title')}
              subtitle={t('availability.no_result_subtitle')}
            />
          }

          {
            props.schedules.map((schedule, index) => (
              <ScheduleCard
                schedule={schedule}
                key={index}
              />
            ))
          }
        </Flex>
      </>
    </AppLayout>
  );
}
