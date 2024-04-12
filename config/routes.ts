export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/employee/login', component: './User/EmployeeLogin' },
      { path: '/user/employer/login', component: './User/EmployerLogin' },
    ]
  },
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    layout: false,
    routes: [
      { path: "/welcome", component: './Welcome', },
      { path: "/welcome/user", component: "./WelcomeUser" }
    ]
  },
  {
    path: "/home",
    layout: false,
    component: "../layouts/HomeLayout",
    routes: [
      {
        path: "/home/job",
        component: "./Job/JobHome"
      },
      {
        path: "/home/chat",
        component: "./Chat/ChatHome"
      },
      {
        path: "/home/graph",
        component: "./Graph/GraphHome"
      },
      {
        path: '/home/graph/detail',
        component: './Graph/GraphDetail'
      },
      {
        path: "/home/user",
        component: "./User/Employee/UserHome"
      },
    ]
  },
  {
    path: '/chat/detail',
    layout: false,
    component: './Rank/CareerDetailPage'
  },
  {
    path: '/user/employee',
    layout: false,
    routes: [
      {
        path: '/user/employee/biography',
        name: '查看在线简历页面',
        component: "./User/Employee/BiographyPage"
      },
      {
        path: '/user/employee/education/add',
        name: '添加教育经历页面',
        component: "./User/Employee/Education/EducationAddPage"
      },
      {
        path: '/user/employee/education/update/:educationId',
        name: '编辑教育经历页面',
        component: './User/Employee/Education/EducationUpdatePage'
      },
      {
        path: '/user/employee/career/add',
        name: '添加理想职业页面',
        component: './Career/CareerAddPage'
      }
    ]
  },
  {
    path: '/career/list',
    name: '职业列表选择',
    layout: false,
    component: './Career/CareerSelectPage'
  },
  {
    path: "/industry/list",
    name: '行业列表选择',
    layout: false,
    component: './Industry/IndustrySelectPage'
  },
  {
    path: '/search',
    layout: false,
    routes: [
      {
        path: '/search',
        component: "./Search/SearchHome"
      },
      {
        path: '/search/query',
        component: './Search/SearchResult'
      }
    ]
  },
  {
    path: '/rank',
    layout: false,
    routes: [
      {
        path: '/rank/career',
        name: '职业排行页面',
        component: "./Rank/CareerRankPage"
      },
      {
        path: '/rank/major',
        component: './Rank/MajorRankPage'
      },
    ]
  },
  {
    path: '/job/recruitment',
    layout: false,
    routes: [
      {
        path: '/job/recruitment/:recruitmentId',
        component: './Recruitment/RecruitmentInfo',
      },
      {
        path: '/job/recruitment/info/employer/:userId',
        component: './Employer/EmployerInfo'
      },
      {
        path: '/job/recruitment/info/company/:companyId',
        component: './Company/CompanyInfo'
      }
    ],
  },
  { path: '*', layout: false, component: './404' },
];
