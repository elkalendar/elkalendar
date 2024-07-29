<?php

namespace App\Enum;

class CompanyRoles
{
    public const LEADER = 'LEADER';

    public const FREELANCER = 'FREELANCER';

    public const EDUCATION = 'EDUCATION';

    public const CUSTOMER = 'CUSTOMER';

    public const SALES = 'SALES';

    public const HR = 'HR';

    public const OTHER = 'OTHER';

    public const ALL = [
        self::LEADER => [
            'label_en' => 'Leader + Entrepreneur',
            'label_ar' => 'مدير / رائد أعمال',
        ],
        self::FREELANCER => [
            'label_en' => 'Freelance + Consultant',
            'label_ar' => 'الاستشارات / العمل الحر',
        ],
        self::EDUCATION => [
            'label_en' => 'Education / Charity',
            'label_ar' => 'التعليم / المؤسسات الخيرية',
        ],
        self::CUSTOMER => [
            'label_en' => 'Customer success + Account Management',
            'label_ar' => 'خدمة العملاء وإدارة حسابات العملاء',
        ],
        self::SALES => [
            'label_en' => 'Sales + Marketing',
            'label_ar' => 'التسويق والمبيعات',
        ],
        self::HR => [
            'label_en' => 'Human Resources / Interview Scheduling',
            'label_ar' => 'الموارد البشرية / جدولة مقابلات العمل',
        ],
        self::OTHER => [
            'label_en' => 'Other',
            'label_ar' => 'اخرى',
        ],
    ];
}
