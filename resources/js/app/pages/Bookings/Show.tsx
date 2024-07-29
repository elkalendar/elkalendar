import React, { useState } from 'react';
import { BiDownload } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { useForm } from '@inertiajs/inertia-react';
import {
  Alert, Button, Modal, Textarea,
} from '@mantine/core';
import AppLayout from '@/layouts/AppLayout';
import BackButton from '@/components/BackButton';

export default function Show(props) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const form = useForm({
    cancel_reason: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(`/bookings/${props.booking.data.id}/cancel`, {
      preserveScroll: true,
    });
  }

  return (
    <AppLayout
      title={`تفاصيل حجز: ${props.booking.data.event.name}`}
      renderHeader={() => (
        <div className="flex items-center gap-2">
          <BackButton location="/bookings" />
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {`تفاصيل حجز: ${props.booking.data.event.name}`}
          </h2>
        </div>
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {
          props.booking.data.cancelledAt && (
          <Alert
            className="mb-6"
            icon={<TiDelete size={24} />}
            title="هذا الحجز ملغي"
            color="red"
          >
            <p>
              تم إلغاء هذا
              الحجز
              {props.booking.data.cancelledBy ? 'بواسطتك' : 'بواسطة المدعو'}
              {' '}
              في
              {props.booking.data.cancelledAt}
            </p>

          </Alert>
          )
        }

        {
          props.booking.data.isPast && (
          <Alert
            className="mb-6"
            title="هذا الحجز في الماضي"
            color="yellow"
          />
          )
        }

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4">

          <div className="rounded-md shadow-md bg-white p-4 h-full border">
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">اسم المدعو: </h4>
              <p className="text-slate-600 text-lg">{props.booking.data.invitee.name}</p>
            </div>
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">البريد الالكتروني:</h4>
              <p className="text-slate-600 text-lg">{props.booking.data.invitee.email}</p>
            </div>
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">التوقيت الزمني:</h4>
              <p className="text-slate-600 text-lg">{props.booking.data.timezone}</p>
            </div>

            <div className="actions flex justify-between">
              {/* <PrimaryButton className="flex items-center"> */}
              {/*    إعادة الجدولة */}
              {/* </PrimaryButton> */}

              <Button
                color="red"
                disabled={props.booking.data.isPast || props.booking.data.cancelledAt}
                onClick={() => setCancelModalOpen(true)}
              >
                إلغاء الحجز
              </Button>
            </div>
          </div>

          <div
            className="rounded-md shadow-md col-span-2 p-4 bg-white border border-r-4 border-t-2"
            style={{
              borderTopColor: props.booking.data.event.color,
              borderRightColor: props.booking.data.event.color,
            }}
          >
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">الاجتماع:</h4>
              <p className="text-slate-600 text-lg">{props.booking.data.event.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="field mb-6">
                <h4 className="font-semibold mb-2">موعد الحجز:</h4>
                <p className="text-slate-600 text-lg">
                  {props.booking.data.formattedTime}
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  {props.booking.data.formattedDate.host}
                </p>
              </div>
            </div>
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">المكان:</h4>
              <p className="text-slate-600 text-lg">
                {props.booking.data.location}
              </p>
            </div>
            <div className="field mb-6">
              <h4 className="font-semibold mb-2">ملاحظات من المدعو:</h4>
              <p className="text-slate-600 text-lg">{props.booking.data.notes ?? '-'}</p>
            </div>

            <div className="mt-6">
              <a
                data-tooltip-id="elkalendar"
                data-tooltip-content="تحميل ملف ICS"
                target="_blank"
                href={`/bookings/${props.booking.data.id}/download`}
                className="inline-flex items-center bg-indigo-200 p-3 rounded-full shadow-md border hover:bg-indigo-400 transition-all duration-300"
                rel="noreferrer"
              >
                <BiDownload />
              </a>
            </div>
          </div>

        </div>

        <Modal
          opened={cancelModalOpen}
          withCloseButton={false}
          onClose={() => setCancelModalOpen(false)}
          dir="rtl"
          size="lg"
        >
          <h2 className="text-2xl mb-4">إلغاء الحجز</h2>

          <p className="text-slate-700 my-6">
            يرجى التأكيد انك تريد الغاء الحجز. سيتم إرسال إشعار بالإلغاء للضيف عن طريق البريد الالكتروني.
          </p>

          <form onSubmit={onSubmit}>
            <Textarea
              label="سبب الإلغاء"
              placeholder="قم بإضافة ملاحظات او السبب وراء إلغاء الحجز."
              description="سيتم إرسال إشعار بالإلغاء للضيف عن طريق البريد الالكتروني."
              value={form.data.cancel_reason}
              onChange={(e) => form.setData('cancel_reason', e.currentTarget.value)}
              error={form.errors.cancel_reason}
            />

            <div className="mt-10 modal-actions flex justify-between items-center">
              <Button color="red" type="submit">
                إلغاء الحجز
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setCancelModalOpen(false);
                }}
              >
                إغلاق
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppLayout>
  );
}
