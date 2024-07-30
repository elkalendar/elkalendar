import React from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import {ImNotification} from 'react-icons/im';
import {InertiaLink} from '@inertiajs/inertia-react';
import {BsTrash3} from 'react-icons/bs';
import NoResults from '@/components/NoResults/NoResults';
import useTypedPage from '@/hooks/useTypedPage';
import PageHeader from '@/components/PageHeader/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import {getAppName} from '@/utils/AppHelpers';
import {showSuccessToast} from "@/utils/FormHelpers";
import {IntegrationProviders} from "@/enums/IntegrationProviders";
import {modals} from "@mantine/modals";

interface Props {
  category?: string;
}

export default function (props: Props) {
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const getCategoriesArray = () => {
    const arr = [{
      value: 'all',
      label: 'الكل',
    }];

    Object.keys(page.props.categories).map((key: any) => {
      arr.push({
        value: key,
        label: page.props.categories[key],
      });
    });

    return arr;
  };

  return (
    <AppLayout
      title="التطبيقات"
      renderHeader={() => (
        <PageHeader
          title="التطبيقات المتصلة"
          subtitle="ادارة التطبيقات المتصلة بحسابك."
        />
      )}
    >
      <div>
        <Group mb={12}>
          <SegmentedControl
            value={page.props.category ?? 'all'}
            data={getCategoriesArray()}
            onChange={(value) => {
              Inertia.visit(`/connected-apps/${value}`, {
                preserveScroll: true,
              });
            }}
          />
        </Group>

        {
          page.props.integrations.data.length === 0 && (
            <NoResults
              icon={<ImNotification size={44}/>}
              title="لا يوجد تطبيقات"
              subtitle="لا يوجد تطبيقات متصلة حالياً."
              action={<Button component={InertiaLink} href="/apps">ربط تطبيق جديد</Button>}
            />
          )
        }

        <Grid>
          {
            page.props.integrations.data.map((integration, index) => (
              <Grid.Col
                key={index}
                gutter={{
                  base: 5, xs: 'md', md: 'xl', xl: 50,
                }}
                span={{base: 12}}
              >
                <Flex
                  direction="column"
                  gap={12}
                  style={{
                    border: '1px solid #e3e3e3',
                    borderRadius: '8px',
                    backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
                    borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
                  }}
                  p={12}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    gap={16}
                  >
                    <Flex gap={16}>
                      <Image h={32} w={32} src={`/svg/${integration.provider}.svg`}/>

                      <Flex direction="column" gap={4}>
                        <Text fw={700}>{getAppName(integration.provider)}</Text>
                        <Text size="sm">{integration.name}</Text>
                        <Text size="xs">{integration.email}</Text>
                      </Flex>
                    </Flex>

                    <ActionIcon
                      onClick={() => {
                        modals.openConfirmModal({
                          title: 'حذف التطبيق؟',
                          centered: true,
                          children: (
                            <Text>
                              هل انت متأكد من حذف هذا التطبيق؟
                            </Text>
                          ),
                          onConfirm: () => Inertia.delete(`/connected-apps/${integration.id}/disconnect`)
                        });
                      }}
                      color="red"
                      variant="subtle"
                      size='lg'
                    >
                      <BsTrash3/>
                    </ActionIcon>
                  </Flex>

                  {
                    integration.provider === IntegrationProviders.GOOGLE_CALENDAR && <Stack gap={16}>
                      <Divider/>
                      <Switch
                        label='مزامنة الحجوزات مع هذا التقويم'
                        description='سيتم مزامنة كل حجز جديد مع هذا التقويم تلقائياً.'
                        checked={integration.settings.sync_bookings}
                        error={page.props.errors?.sync_bookings}
                        onChange={() => {
                          Inertia.post(`/connected-apps/${integration.id}/settings`, {
                            sync_bookings: !integration.settings.sync_bookings,
                          }, {
                            preserveScroll: true,
                            onSuccess: () => {
                              showSuccessToast('تم تحديث الاعدادات بنجاح.');
                            },
                          });
                        }}
                      />
                    </Stack>
                  }
                </Flex>
              </Grid.Col>
            ))
          }
        </Grid>
      </div>
    </AppLayout>
  );
}
