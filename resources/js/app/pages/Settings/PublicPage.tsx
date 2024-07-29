import React, {useRef, useState} from 'react';
import {Avatar, Button, Flex, Group, Input, InputError, Text, Textarea, TextInput,} from '@mantine/core';
import {useForm} from '@inertiajs/inertia-react';
import {FiSave} from 'react-icons/fi';
import useTypedPage from '@/hooks/useTypedPage';
import PageHeader from '@/components/PageHeader/PageHeader';
import SettingsLayout from '@/layouts/SettingsLayout';
import {showSuccessToast} from '@/utils/FormHelpers';
import {Inertia} from "@inertiajs/inertia";

export default function () {
  const page = useTypedPage();

  const form = useForm({
    name: page.props.auth.user.data.profileName,
    username: page.props.auth.user.data.username,
    profileMessage: page.props.auth.user.data.profileMessage,
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

  function deletePhoto() {
    Inertia.delete('/user/profile-photo', {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
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
      title="الصفحة العامة"
      renderHeader={() => (
        <PageHeader
          title="الصفحة العامة"
          subtitle="تعديل الصفحة العامة للملف الشخصي وطريقة عرض الاجتماعات"
        />
      )}
    >
      <Flex direction="column" gap={22}>
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
            src={page.props.auth.user.data.profileImage}
            alt={page.props.auth.user.data.name}
            size="lg"
          />
        )}

        <Flex gap={12} mt={12}>
          <Button onClick={selectNewPhoto}>
            تغيير الصورة
          </Button>

          {page.props.auth.user.data.profileImage ? (
            <Button onClick={deletePhoto} color="red">
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
        <InputError message={form.errors.photo}/>

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

        <Flex direction="column">
          <Input.Wrapper
            withAsterisk
            label="اسم المستخدم"
            description="قم باختيار اسم مستخدم مميز حيث انه سيكون المعرف الخاص بك في رابط الكالندر."
          >
            <TextInput
              className='ltr'
              value={form.data.username}
              error={form.errors.username}
              onChange={(e) => form.setData('username', e.currentTarget.value)}
              placeholder="elonmusk@gmail.com"
            />
          </Input.Wrapper>

          <Text
            size="sm"
            c="dark.2"
            styles={{
              root: {
                textAlign: 'left',
                direction: 'ltr',
                padding: '0.5rem 0',
              },
            }}
          >
            {page.props.shortDomainWithScheme}/{form.data.username}
          </Text>
        </Flex>

        <Textarea
          label="محتوى الصفحة العامة"
          description="يمكنك تعديل محتوى الصفحة العامة من هنا الذي يظهر لزوارك من هنا"
          value={form.data.profileMessage}
          onChange={(e) => form.setData('profileMessage', e.target.value)}
          rows={5}
        />

        <Group>
          <Button
            disabled={!form.isDirty || form.processing}
            loading={form.processing}
            onClick={() => {
              form.post('/settings/public-page', {
                preserveScroll: true,
                preserveState: (page) => Object.keys(page.props.errors).length,
                onSuccess: () => {
                  clearPhotoFileInput();
                  showSuccessToast('تم تحديث الإعدادات بنجاح');
                },
              });
            }}
            leftSection={<FiSave/>}
          >
            حفظ
          </Button>
        </Group>
      </Flex>
    </SettingsLayout>
  );
}
