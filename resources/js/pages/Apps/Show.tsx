import React from 'react';
import {Alert, Badge, Button, Flex, Group, Image, Title,} from '@mantine/core';
import {VscDebugDisconnect} from 'react-icons/vsc';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {PiPlugsConnectedBold} from 'react-icons/pi';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import BackButton from '@/components/BackButton';
import {IntegrationProviders} from '@/enums/IntegrationProviders';
import {getAppCategoryName} from '@/utils/AppHelpers';

export default function Show() {
  const page = useTypedPage();

  return (
    <AppLayout
      title="إجتماعاتي"
      renderHeader={() => (
        <PageHeader
          title="الطبيقات"
          rightSection={<BackButton href="/apps"/>}
        />
      )}
    >
      <Group mb={22}>
        <Image src={`/svg/${page.props.app.data.icon}`}/>
      </Group>

      <Flex gap={8} direction="column">
        <Title>{page.props.app.data.name}</Title>
        <Badge>{getAppCategoryName(page.props.app.data.category)}</Badge>
      </Flex>

      <Group my={20} position="center">
        {page.props.app.data.description}

        {
          page.props.app.data.key === IntegrationProviders.GOOGLE_CALENDAR && (
            <Alert icon={<AiOutlineInfoCircle size={18}/>} title="ملاحظه" variant="light" w="100%" color="yellow">
              عند ربط هذا التطبيق يتم ربط تطبيق جوجل Meet.
            </Alert>
          )
        }
        {
          page.props.app.data.key === IntegrationProviders.GOOGLE_MEET && (
            <Alert icon={<AiOutlineInfoCircle size={18}/>} title="ملاحظه" variant="light" w="100%" color="yellow">
              عند ربط هذا التطبيق يتم ربط تطبيق تقويم Google.
            </Alert>
          )
        }
      </Group>

      <Group my={20} position="center">
        {
          page.props.appIntegrationsCount > 0 ? (
            <Button
              disabled
              variant="light"
              leftSection={<PiPlugsConnectedBold size={18}/>}
            >
              تم الربط
              {' '}
              {page.props.appIntegrationsCount}
              {' '}
              مرة
            </Button>
          ) : (
            <Button
              component="a"
              href={`/apps/connect/${page.props.app.data.key}`}
              variant="light"
              leftSection={<VscDebugDisconnect size={18}/>}
            >
              {page.props.appIntegrationsCount > 0 ? 'اضافة ربط جديد' : 'ربط التطبيق'}
            </Button>
          )
        }
      </Group>
    </AppLayout>
  );
}
