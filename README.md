![elKalendar Cover](storage/github-cover.jpg)

<p align="center">
  <a href="https://docs.elkalendar.com">Docs</a>
  -
  <a href="https://github.com/elkalendar/elkalendar/issues/new?assignees=&amp;labels=bug&amp;template=bug_report.md">Bug report</a>
</p>

# elKalendar
#### A free and open-source scheduling system was built with Laravel.

## Built with:
[![elKalendar Tech Stack](https://skillicons.dev/icons?i=php,laravel,react,mysql,nginx,ts,html,css)](https://stackshare.io/elkalendar/elkalendar)

> [!WARNING]
> This app is in development, and It’s still in beta version.

## How to run

Clone the app to your machine and follow the steps:
```shell
git clone https://github.com/elkalendar/elkalendar.git
cd elkalendar

composer install && npm i

# copy .env.example file
cp .env.example .env

php artisan key:generate

# check and adjust the configuration in the .env file 
# according to your local dev env and then run
php artisan migrate 

npm run build:all

php artisan serve
```

## Principles, Vision, Goals, and Strategy
At elKalendar, we strive to harness technology to streamline scheduling and enhance relationships without the pitfalls of larger, impersonal networks.


### Vision
elKalendar’s vision is to transform how people manage their time and appointments, making daily schedules effortless and more reliable.

### Principles
elKalendar is guided by foundational principles:

- **Strengthen Relationships:** It aims to facilitate better communication and scheduling between individuals and groups.
- **Simplicity and Accessibility:** The app is designed for ease of use, understanding, and contribution, ensuring it is simple to maintain.
- **Privacy First:** elKalendar is committed to user privacy. It is not a social network, does not display ads, nor tracks users.
- **Openness:** We are transparent in our processes and remain committed to keeping elKalendar open-source.
- **Specialization:** Our app excels at scheduling and appointment booking, focusing solely on these functions to deliver top performance.
- **Clear Documentation:** We ensure that elKalendar is well-documented to support both users and developers effectively.

### Goals
Our goals for elKalendar are to provide a platform that is:

- **User-friendly:** We prioritize simplicity to make advanced scheduling accessible to everyone.
- **Community-driven:** As an open-source software, elKalendar leverages community insights to enhance functionality and foster innovation.
- **Easy to contribute to:** With a straightforward codebase, we invite contributions that keep elKalendar easy to update and maintain.
- **Universally compatible:** elKalendar is designed to function seamlessly across all operating systems and devices, ensuring it is accessible wherever users are.

## Why Open Source?
Why have we chosen to make elKalendar open source? Isn't it risky? Could someone potentially use our code to start a competitive, profit-driven business? These are common inquiries we've received.

Here’s our straightforward answer: Yes, it’s possible for someone to fork elKalendar and create a competitive project. They could even potentially profit from it despite the licensing constraints. And while we might not even be aware of it, that’s a risk we are willing to take.

We have several compelling reasons for open-sourcing elKalendar:

- **Learning and Exercising Skills:** elKalendar started as a learning project, so open sourcing it offers a unique opportunity for developers of all skill levels to learn and sharpen their coding and project management skills. Engaging with a live, evolving project allows contributors to experiment, learn from real-world challenges, and grow their capabilities in a supportive environment.

- **Potential to Impact Lives:** We believe elKalendar can significantly improve how people manage their schedules and relationships. While our goal includes generating revenue, we also want the app to be universally beneficial. Open sourcing elKalendar can propel the app to reach and exceed our aspirations, fueled by a collective vision that embraces contributions from all quarters.

- **Collaboration is Key:** The truth is, no matter how talented a team we assemble, the collective power of a community surpasses it. By open sourcing, we gain faster bug fixes, quicker feature development, and invaluable contributions from developers who use elKalendar in their daily lives, enhancing their own and others' scheduling efficiency.

- **Transparency Breeds Excellence:** Openness in development cultivates trust and respect. With everything visible, there’s no room for hidden agendas in the code or operations. This transparency is a powerful motivator, constantly pushing us towards integrity and excellence.

- **Community Wins:** Once you build a community of passionate developers, the benefits extend beyond the code. Developers influence through apps, discussions, and shares within their networks. By nurturing these relationships, we not only enhance elKalendar but also foster a loyal user base.


Open sourcing elKalendar isn’t just a strategy; it’s a commitment to creating something genuinely great with the global community.

## Contribute

Excited to make a difference? We're thrilled to have you! elKalendar is an open project, and we welcome contributions from all, no matter how big or small.

Here are various ways you can contribute and make an impact:

### Community Contributions
- **Spread the Word:** Talking about elKalendar is the most effective way to support it. Engage with the community by sharing your stories and insights through blogs, articles, or on social media.
- **Engage and Support:** Join the conversation and offer support on our [issues page](https://github.com/elkalendar/elkalendar/issues). Your expertise could greatly benefit others.
- **Support Us Financially:** Help sustain our development by contributing through [Patreon](https://www.patreon.com/elkalendar).

### Developer Contributions
- **Start Here:** Our Contribution Guide details everything you need to know to begin contributing.
- **Local Development:** Set up elKalendar on your local machine by following the steps in our setup guide.
- **Tackle Bugs:** For immediate impact, fix issues marked as ‘Bugs’ on our [issues page](https://github.com/elkalendar/elkalendar/issues).
- **Seek Opportunities:** Issues labeled `help wanted` are perfect for those looking for accessible ways to contribute.
- **First Contributions:** If you’re new here, start with `good first issue` to ease into project contributions with smaller tasks.
- **Challenging Projects:** Experienced developers should look at `feature request` for more complex tasks that require detailed coordination with our team.

## Patreon Support

You can support the development of elKalendar on [Patreon](https://www.patreon.com/elkalendar). We deeply appreciate your assistance.

## Team
Our team is made of:

- [m074554n (Mohamed Hassan)](https://github.com/m074554n)

We are incredibly fortunate to have a vibrant [community of developers](https://github.com/elkalendar/elkalendar/graphs/contributors) whose contributions significantly enhance elKalendar.

## Gratitude for Open Source

elKalendar benefits immensely from various open-source projects, and we are profoundly thankful for this support. By providing elKalendar as a free, open-source project, we aim to give back to the community and help others just as these projects have helped us.

## License
Copyright © 2022–2024

Licensed under [the AGPL License](/LICENSE.md).
