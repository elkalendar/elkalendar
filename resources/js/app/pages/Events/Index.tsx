import React, {useState} from 'react';
import {BiPlus} from 'react-icons/bi';
import {Button, Flex, Input, Modal, Slider,} from '@mantine/core';
import {useForm} from '@inertiajs/inertia-react';
import {BsCalendar} from 'react-icons/bs';
import {FaSave} from 'react-icons/fa';
import AppLayout from '@/layouts/AppLayout';
import {Event} from '@/types/entities';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import EventsTable from '@/components/Events/EventsTable';
import {showSuccessToast} from '@/utils/FormHelpers';
import SlugInput from '@/components/SlugInput';
import useTypedPage from "@/hooks/useTypedPage";

interface IndexProps {
  events: {
    data: Event[]
  }
}

export default function Dashboard(props: IndexProps) {
  const page = useTypedPage();
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const headerAction = (
    <Button
      leftSection={<BiPlus/>}
      onClick={() => setCreateNewModalOpen(true)}
    >
      إجتماع جديد
    </Button>
  );

  const form = useForm({
    name: '',
    slug: '',
    duration: 30,
  });

  return (
    <AppLayout
      title="إجتماعاتي"
      renderHeader={() => (
        <PageHeader
          title="إجتماعاتي"
          subtitle="أنشئ اجتماعات لمشاركتها ليقوم الأشخاص بحجزها في التقويم الخاص بك."
          leftSection={headerAction}
        />
      )}
    >
      <Modal
        centered
        opened={createNewModalOpen}
        onClose={() => setCreateNewModalOpen(false)}
        title="اضافة اجتماع جديد"
      >
        <Flex
          direction="column"
          gap={22}
        >
          <Input.Wrapper
            withAsterisk
            label="الاسم"
            description="اختر اسم للاجتماع"
            error={form.errors.name}
          >
            <Input
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
            />
          </Input.Wrapper>

          <Input.Wrapper
            withAsterisk
            label="الرابط"
            description="يستخدم الرابط للوصول إلى الاجتماع"
            error={form.errors.slug}
          >
            <SlugInput
              prefix={"https://elkalendar.com/" + page.props.auth.user.data.username + "/"}
              value={form.data.slug}
              onChange={(e) => form.setData('slug', e.currentTarget.value)}
            />
          </Input.Wrapper>

          <Input.Wrapper
            withAsterisk
            label="مدة الاجتماع"
            description="اختر مدة الاجتماع بالدقائق"
            error={form.errors.duration}
          >
            <Slider
              label={(value) => `${value} دقيقة`}
              min={15}
              max={120}
              step={5}
              defaultValue={30}
              onChange={(value) => form.setData('duration', value)}
            />
          </Input.Wrapper>
          <div className="actions">
            <Button
              type="submit"
              onClick={() => {
                form.post('/events', {
                  preserveScroll: true,
                  data: form.data,
                  onSuccess: () => {
                    showSuccessToast();
                    setCreateNewModalOpen(false);
                  },
                });
              }}
              leftSection={<FaSave/>}
            >
              حفظ
            </Button>
          </div>
        </Flex>
      </Modal>

      <div className="">
        {
          props.events.data.length < 1 ? (
            <NoResults
              title="لا يوجد اجتماعات"
              subtitle="تمكّنك الاجتماعات من مشاركة الروابط التي تعرض الأوقات المتاحة في التقويم الخاص بك وتسمح للأشخاص بإجراء الحجوزات معك."
              icon={<BsCalendar size="3rem"/>}
            />
          ) : <EventsTable events={props.events.data}/>
        }
      </div>
    </AppLayout>
  );
}
