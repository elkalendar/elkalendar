import React, {useRef, useState} from 'react';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {Inertia} from '@inertiajs/inertia';
import {Avatar, Button, Flex, Group, Input, Text, Alert} from '@mantine/core';
import {FiSave} from 'react-icons/fi';
import {useForm} from "@inertiajs/inertia-react";
import SettingsLayout from "@/layouts/SettingsLayout";
import useSuccessToast from "@/hooks/useSuccessToast";

export default () => {
  const successToast = useSuccessToast();
  const page = useTypedPage();
  const form = useForm({
    _method: 'PUT',
    name: page.props.auth.user.name,
    photo: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('photo', photo);

    const reader = new FileReader();

    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.post('/user/profile-information', {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: (p) => {
        successToast();
        clearPhotoFileInput();
        form.setDefaults();
      },
    });
  }

  function deletePhoto() {
    Inertia.delete('/user/profile-photo', {
      preserveScroll: true,
      preserveState: false,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
        form.setDefaults();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <SettingsLayout
      title="المعلومات الشخصية"
      renderHeader={() => (
        <PageHeader
          title="المعلومات الشخصية"
          subtitle="ادارة اعدادات حسابك الشخصي وبياناتك الاساسية"
        />
      )}
    >
      <Flex gap={22} direction="column">
        <input
          type="file"
          style={{display: 'none'}}
          ref={photoRef}
          onChange={updatePhotoPreview}
        />

        {photoPreview ? (
          <Group mt={12}>
            <Avatar size="lg" src={photoPreview}/>
          </Group>
        ) : (
          <Avatar
            src={page.props.auth.user.avatar}
            alt={page.props.auth.user.name}
            size="lg"
          />
        )}

        <Flex gap={12} mt={12}>
          <Button onClick={selectNewPhoto}>
            تغيير الصورة
          </Button>

          {page.props.auth.user.avatar ? (
            <Button onClick={() => {
              deletePhoto();
            }} color="red">
              حذف الصورة
            </Button>
          ) : null}
        </Flex>

        {
          form.errors.photo && (
            <Text c="red.4" my={12}>
              {form.errors.photo}
            </Text>
          )
        }

        {
          form.errors.photo && <Alert>
            {form.errors.photo}
          </Alert>
        }

        <Input.Wrapper
          withAsterisk
          label="الاسم"
          error={form.errors.name}
        >
          <Input
            type="text"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.currentTarget.value)}
            placeholder="elonmusk@gmail.com"
          />
        </Input.Wrapper>


        <div className="flex">
          <Button
            disabled={!form.isDirty || form.processing}
            loading={form.processing}
            onClick={(e) => submitForm(e)}
            leftSection={<FiSave/>}
          >
            حفظ
          </Button>
        </div>
      </Flex>
    </SettingsLayout>
  );
}
