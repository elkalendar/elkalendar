<?php

declare(strict_types=1);

use App\Enum\Integrations;

return [
    'apps' => [
        'categories' => [
            \App\Enum\AppCategories::CALENDAR->value => 'التقويمات',
            \App\Enum\AppCategories::CONFERENCE->value => 'المكالمات والكونفرانس',
            \App\Enum\AppCategories::PAYMENT->value => 'المدفوعات',
            \App\Enum\AppCategories::AUTOMATION->value => 'الأتمتة',
            \App\Enum\AppCategories::OTHER->value => 'اخرى',
        ],
        Integrations::PROVIDER_GOOGLE_CALENDAR => [
            'name' => 'تقويم Google',
            'description' => 'جوجل كاليندر (بالإنجليزية: Google Calendar)‏ إحدى الخدمات التي تقدمها جوجل وهو تطبيق ويب يساعد في تنظيم الوقت والمواعيد. تقوم هذه الخدمة بالتنسيق بين جهات الاتصال على جيميل والرزمانة وقد تم استخدام هذه الخدمة في قاعة دراسة جوجل، لتحديد أوقات انتهاء الواجبات وتواريخ الرحلات الميدانية. يقدم جوجل كاليندر واجهة رسومية مشابهة لتطبيقات الرزمانات لسطح المكتب مما يساعد على سهولة استخدامها. كما أن جوجل كاليندر تسمح بمشاركة الرزمانات بين المستخدمين سواء كانت للقراءة فقط أو للقراءة والتعديل. ومن مميزاتها انها تتوافق مع أي نظام تشغيل كما أنها تتوافق مع معظم متصفحات الويب.',
        ],
        Integrations::PROVIDER_GOOGLE_MEET => [
            'name' => 'مقابلات Google',
            'description' => 'تتيح Google للجميع عقد اجتماعات الفيديو بمستوى اجتماعات المؤسّسات. والآن، يمكن لأي شخص لديه حساب Google إنشاء اجتماع على الإنترنت مع ما يصل إلى 100 مشارك ولمدة تصل إلى 60 دقيقة لكل اجتماع.',
        ],
        Integrations::PROVIDER_ZOOM => [
            'name' => 'زووم',
            'description' => 'زوم (بالإنجليزية: Zoom Video Communications)‏ هي شركة تنشط في سان خوسيه، كاليفورنيا توفر خدمات الاتصال الهاتفي عبر الفيديو والدردشة عبر الإنترنت من خلال منصة برمجية بتقنية الند للند المعتمدة على السحابة. تقدم زوم برمجيات اتصال بالفيديو تُستخدم في المؤتمرات والاجتماعات عن بُعد وكذلك العمل والتعليم والعلاقات الاجتماعية عن بعد.',
        ],
    ],
];
