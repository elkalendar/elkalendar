<?php

declare(strict_types=1);

return [
    'text' => [
        'label' => 'النص المخصص',
        'description' => 'النص الذي سيتم عرضه/إرساله للزوار بعد الحجز',
    ],
    'in_person_guest' => [
        'description' => 'عند تفعيل هذا الخيار سيقوم الكالندر بطلب من المدعو إدخال عنوانه اثناء الحجز',
    ],
    'in_person_host' => [
        'input_label' => 'العنوان',
        'input_description' => 'العنوان او المكان الذي سيتم عرضه للزوار',
        'switch_label' => 'العرض أثناء الحجز',
        'switch_description' => 'إذا تم تفعيل هذا الخيار، سيتم عرض هذا المكان للزوار أثناء عملية الحجز',
    ],
    'link' => [
        'title_label' => 'عنوان الرابط',
        'title_description' => 'ادخل عنوان مخصص ليظهر لزوارك اثناء اختيار الرابط',
        'link_label' => 'رابط المقابلة',
        'link_description' => 'الرابط الذي سيستخدمه زوارك للانضمام الى الاجتماع',
        'note' => 'سيتم اظهار/إرسال الرابط للزوار بعد الحجز',
    ],
    'event' => [
        'new' => [
            'title' => 'اضافة اجتماع جديد',
            'name_name' => 'الاسم',
            'name_desc' => 'اختر اسم للاجتماع',
            'slug_name' => 'الرابط',
            'slug_desc' => 'يستخدم الرابط للوصول إلى الاجتماع',
            'duration_name' => 'مدة الاجتماع',
            'duration_desc' => 'اختر مدة الاجتماع بالدقائق',
            'minute' => 'دقيقة',
        ],
        'setup' => [
            'name_label' => 'الاسم',
            'description_label' => 'وصف الاجتماع',
            'description_description' => 'وصف مختصر عن الاجتماع ليظهر في صفحة الحجز',
            'slug_label' => 'رابط الاجتماع',
            'slug_description' => 'اختر رابط الاجتماع الذي ستشاركه مع الاشخاص لحجز الاجتماع. يجب ان يكون حروف وارقام انجليزية فقط.',
            'duration_label' => 'مدة الاجتماع',
            'duration_description' => 'اختر مدة الاجتماع بالدقائق',
            'minute' => 'دقيقة',
            'visible_label' => 'عرض في الصفحة الشخصية؟',
            'color_label' => 'لون الاجتماع',
            'color_description' => 'تخصيص الاجتماع بلون مميز',
        ],
        'availability' => [
            'schedule_title' => 'جدول المواعيد',
            'schedule_description' => 'اختر جدول المواعيد الذي تريد استخدامه لهذا الاجتماع',
            'schedule_placeholder' => 'اختر جدول المواعيد',
            'name' => 'الاسم',
        ],
        'locations' => [
            'label' => 'طرق عقد الاجتماع',
            'description' => 'اضف واحدة او اكثر من طرق عقد الاجتماع سواء مقابلة حية او اونلاين',
            'placeholder' => 'اختر طريقة',
            'group_in_person' => 'مقابلة شخصية',
            'group_other' => 'اخرى',
        ]
    ],
    'booking' => [
        'timezone_label' => 'التوقيت الزمني',
        'timezone_description' => 'أختر التوقيت الزمني الخاص بك',
        'timezone_no_result' => 'لا يوجد نتائج',
        'timezone_placeholder' => 'أختر التوقيت الزمني',
    ]
];
