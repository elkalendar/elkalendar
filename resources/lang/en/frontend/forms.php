<?php

declare(strict_types=1);

return [
    'text' => [
        'label' => 'Custom Text',
        'description' => 'The text that will be displayed/sent to visitors after booking',
    ],
    'in_person_guest' => [
        'description' => 'When this option is activated, the calendar will ask the invitee to enter their address during booking',
    ],
    'in_person_host' => [
        'input_label' => 'Address',
        'input_description' => 'The address or location that will be displayed to visitors',
        'switch_label' => 'Display during booking',
        'switch_description' => 'If this option is activated, this location will be displayed to visitors during the booking process',
    ],
    'link' => [
        'title_label' => 'Link Title',
        'title_description' => 'Enter a custom title to appear to your visitors when choosing the link',
        'link_label' => 'Meeting Link',
        'link_description' => 'The link that your visitors will use to join the meeting',
        'note' => 'The link will be shown/sent to visitors after booking',
    ],
    'event' => [
        'new' => [
            'title' => 'Add New Event',
            'name_name' => 'Name',
            'name_desc' => 'Choose a name for the meeting',
            'slug_name' => 'Link',
            'slug_desc' => 'The link used to access the meeting',
            'duration_name' => 'Meeting Duration',
            'duration_desc' => 'Choose the duration of the meeting in minutes',
            'minute' => 'minute',
        ],
        'setup' => [
            'name_label' => 'Name',
            'description_label' => 'Meeting Description',
            'description_description' => 'A brief description of the meeting to appear on the booking page',
            'slug_label' => 'Meeting Link',
            'slug_description' => 'Choose the meeting link to share with people for booking the meeting. It must be in English letters and numbers only.',
            'duration_label' => 'Meeting Duration',
            'duration_description' => 'Choose the duration of the meeting in minutes',
            'minute' => 'minute',
            'visible_label' => 'Show on personal page?',
            'color_label' => 'Meeting Color',
            'color_description' => 'Customize the meeting with a distinctive color',
        ],
        'availability' => [
            'schedule_title' => 'Schedule',
            'schedule_description' => 'Choose the schedule you want to use for this meeting',
            'schedule_placeholder' => 'Choose a schedule',
            'name' => 'Name',
        ],
        'locations' => [
            'label' => 'Meeting Conduct Methods',
            'description' => 'Add one or more methods of conducting the meeting, whether in person or online',
            'placeholder' => 'Choose a method',
            'group_in_person' => 'In-person Meeting',
            'group_other' => 'Other',
        ]
    ],
    'booking' => [
        'timezone_label' => 'Time Zone',
        'timezone_description' => 'Choose your time zone',
        'timezone_no_result' => 'No results',
        'timezone_placeholder' => 'Choose time zone',
    ]
];
