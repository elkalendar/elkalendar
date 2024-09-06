<?php

declare(strict_types=1);

return [
    'general' => 'General Settings',
    'general_subtitle' => 'Manage settings for your language and timezone',
    'public' => 'Public Page',
    'public_subtitle' => 'Edit the public profile page and how meetings are displayed',
    'personal' => 'Personal Information',
    'personal_subtitle' => 'Manage your personal account settings and basic data',
    'password' => 'Password',
    'password_subtitle' => 'Change your password. (You may need to log in again after changing your password).',
    'forms' => [
        'general' => [
            'lang' => 'Language',
            'lang_desc' => 'Change the language you want to use in the calendar application.',
            'time_format' => 'Time Format',
            'time_format_desc' => 'This is an internal setting and will not affect how times are displayed on your public booking pages or to anyone booking you.',
            'country' => 'Country',
            'country_desc' => 'This setting is used to specify your country within the calendar system',
            'seo' => 'Enable SEO Indexing',
            'seo_desc' => 'Allow search engines to access your public content',
            'hour' => 'Hour'
        ],
        'public' => [
            'name' => 'Name',
            'name_desc' => 'The name that will appear to users during booking',
            'username' => 'Username',
            'username_desc' => 'Choose a unique username as it will be your identifier in the calendar link.',
            'welcome_message' => 'Public Page Content',
            'welcome_message_desc' => 'You can edit the content of the public page from here that appears to your visitors',
        ],
        'password' => [
            'current' => 'Current Password',
            'new' => 'New Password',
            'new_confirmation' => 'Confirm New Password',
        ]
    ],
];
