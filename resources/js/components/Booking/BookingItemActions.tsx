import React, {useState} from 'react';
import {Button, Flex, Modal, Textarea,} from '@mantine/core';
import {MdOutlineCancel} from 'react-icons/md';
import {FaX} from 'react-icons/fa6';
import {useForm} from '@inertiajs/inertia-react';
import {Booking} from '@/types/entities';
import {showSuccessToast} from '@/utils/FormHelpers';
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";

interface BookingItemActionsProps {
  booking: Booking
  toggle: () => void
  opened: boolean
}

export default function (props: BookingItemActionsProps) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const form = useForm({
    cancel_reason: '',
  });

  return (
    <Flex gap={8}>
      <Modal
        centered
        opened={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="إلغاء الحجز"
      >
        <Flex gap={22} direction="column">
          <Textarea
            withAsterisk
            label="سبب الإلغاء"
            description="سيتم إرسال إشعار بالإلغاء للحضور عن طريق البريد الالكتروني."
            placeholder="مثال: لا يمكنني الحضور لأسباب شخصية."
            error={form.errors.cancel_reason}
            value={form.data.cancel_reason}
            onChange={(e) => form.setData('cancel_reason', e.currentTarget.value)}
          />

          <div className="actions">
            <Button
              type="submit"
              color="red"
              onClick={() => {
                form.post(`/bookings/${props.booking.id}/cancel`, {
                  preserveScroll: true,
                  onSuccess: () => {
                    showSuccessToast('تم إلغاء الحجز بنجاح');
                    setCancelModalOpen(false);
                  },
                });
              }}
              leftSection={<MdOutlineCancel/>}
            >
              إلغاء الحجز
            </Button>
          </div>
        </Flex>
      </Modal>

      <Button
        variant="subtle"
        onClick={props.toggle}
        leftSection={props.opened ? <RiArrowUpSLine size={22}/> : <RiArrowDownSLine size={22}/>}
      >
        {props.opened ? 'اخفاء التفاصيل' : 'عرض التفاصيل'}
      </Button>
      {
        !props.booking.isCancelled && !props.booking.isPastHost && (<Button
          color="red"
          variant="subtle"
          leftSection={<FaX/>}
          size="xs"
          onClick={() => setCancelModalOpen(true)}
        >
          إلغاء
        </Button>)
      }

    </Flex>
  );
}
