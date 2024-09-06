import React, {useState} from 'react';
import {Button, Flex, Modal, Textarea,} from '@mantine/core';
import {MdOutlineCancel} from 'react-icons/md';
import {FaX} from 'react-icons/fa6';
import {useForm} from '@inertiajs/inertia-react';
import {Booking} from '@/types/entities';
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface BookingItemActionsProps {
  booking: Booking
  toggle: () => void
  opened: boolean
}

export default function (props: BookingItemActionsProps) {
  const {t} = useTranslation();
  const successToast = useSuccessToast();
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
        title={t('bookings.forms.cancel.title')}
      >
        <Flex gap={22} direction="column">
          <Textarea
            withAsterisk
            label={t('bookings.forms.cancel.reason_label')}
            description={t('bookings.forms.cancel.reason_description')}
            placeholder={t('bookings.forms.cancel.reason_placeholder')}
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
                    useSuccessToast();
                    setCancelModalOpen(false);
                  },
                });
              }}
              leftSection={<MdOutlineCancel/>}
            >
              {t('btn.cancel_booking')}
            </Button>
          </div>
        </Flex>
      </Modal>

      <Button
        variant="subtle"
        onClick={props.toggle}
        leftSection={props.opened ? <RiArrowUpSLine size={22}/> : <RiArrowDownSLine size={22}/>}
      >
        {
          props.opened ?
            t('btn.show_details') :
            t('btn.hide_details')
        }
      </Button>
      {
        !props.booking.isCancelled && !props.booking.isPastHost && (<Button
          color="red"
          variant="subtle"
          leftSection={<FaX/>}
          size="xs"
          onClick={() => setCancelModalOpen(true)}
        >
          {t('btn.cancel')}
        </Button>)
      }
    </Flex>
  );
}
