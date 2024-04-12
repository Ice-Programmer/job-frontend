declare namespace API {
  type AddressVO = {
    cityList?: CityVO[];
    id?: number;
    provinceName?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCompanyVO = {
    code?: number;
    data?: CompanyVO;
    message?: string;
  };

  type BaseResponseEmployeeEducationVO = {
    code?: number;
    data?: EmployeeEducationVO;
    message?: string;
  };

  type BaseResponseEmployeeExperienceVO = {
    code?: number;
    data?: EmployeeExperienceVO;
    message?: string;
  };

  type BaseResponseEmployeeVO = {
    code?: number;
    data?: EmployeeVO;
    message?: string;
  };

  type BaseResponseEmployeeWishCareerVO = {
    code?: number;
    data?: EmployeeWishCareerVO;
    message?: string;
  };

  type BaseResponseEmployerVO = {
    code?: number;
    data?: EmployerVO;
    message?: string;
  };

  type BaseResponseint = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListAddressVO = {
    code?: number;
    data?: AddressVO[];
    message?: string;
  };

  type BaseResponseListCareerIndustryVO = {
    code?: number;
    data?: CareerIndustryVO[];
    message?: string;
  };

  type BaseResponseListCareerVO = {
    code?: number;
    data?: CareerVO[];
    message?: string;
  };

  type BaseResponseListMajorVO = {
    code?: number;
    data?: MajorVO[];
    message?: string;
  };

  type BaseResponseListQualificationVO = {
    code?: number;
    data?: QualificationVO[];
    message?: string;
  };

  type BaseResponseListSchoolVO = {
    code?: number;
    data?: SchoolVO[];
    message?: string;
  };

  type BaseResponseListstring = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageCompanyVO = {
    code?: number;
    data?: PageCompanyVO;
    message?: string;
  };

  type BaseResponsePageEmployeeEducationVO = {
    code?: number;
    data?: PageEmployeeEducationVO;
    message?: string;
  };

  type BaseResponsePageEmployeeExperienceVO = {
    code?: number;
    data?: PageEmployeeExperienceVO;
    message?: string;
  };

  type BaseResponsePageEmployeeWishCareerVO = {
    code?: number;
    data?: PageEmployeeWishCareerVO;
    message?: string;
  };

  type BaseResponsePageEmployerVO = {
    code?: number;
    data?: PageEmployerVO;
    message?: string;
  };

  type BaseResponsePageRecruitmentCommentVO = {
    code?: number;
    data?: PageRecruitmentCommentVO;
    message?: string;
  };

  type BaseResponsePageRecruitmentVO = {
    code?: number;
    data?: PageRecruitmentVO;
    message?: string;
  };

  type BaseResponseRecruitmentVO = {
    code?: number;
    data?: RecruitmentVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserLoginVO = {
    code?: number;
    data?: UserLoginVO;
    message?: string;
  };

  type CareerIndustryVO = {
    id?: number;
    industryInfoList?: IndustryVO[];
    industryType?: string;
  };

  type CareerVO = {
    id?: number;
    positionInfoList?: PositionVO[];
    positionType?: string;
  };

  type CityVO = {
    cityName?: string;
    id?: number;
  };

  type CompanyAddRequest = {
    cityId?: number;
    companyAddress?: string;
    companyDescript?: string;
    companyImgList?: string[];
    companyIndustry?: number;
    companyLogo?: string;
    companyName?: string;
  };

  type CompanyInfo = {
    companyLogo?: string;
    companyName?: string;
    id?: number;
  };

  type CompanyQueryRequest = {
    cityId?: number;
    companyIndustryType?: number;
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type CompanyUpdateRequest = {
    cityId?: number;
    companyAddress?: string;
    companyDescript?: string;
    companyImgList?: string[];
    companyIndustry?: number;
    companyLogo?: string;
    companyName?: string;
    id?: number;
  };

  type CompanyVO = {
    backgroundImage?: string;
    companyAddress?: string;
    companyDescript?: string;
    companyImgList?: string[];
    companyIndustryId?: number;
    companyIndustryName?: string;
    companyLogo?: string;
    companyName?: string;
    coordinateX?: number;
    coordinateY?: number;
    id?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type EducationAddRequest = {
    activity?: string;
    beginYear?: number;
    educationType?: number;
    endYear?: number;
    majorId?: number;
    schoolId?: number;
  };

  type EducationQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    majorId?: number;
    pageSize?: number;
    schoolId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type EducationUpdateRequest = {
    activity?: string;
    beginYear?: number;
    educationType?: number;
    endYear?: number;
    id?: number;
    majorId?: number;
    schoolId?: number;
  };

  type EmployeeEducationVO = {
    activity?: string;
    beginYear?: number;
    educationType?: number;
    endYear?: number;
    id?: number;
    majorId?: number;
    majorName?: string;
    postNum?: number;
    schoolId?: number;
    schoolName?: string;
  };

  type EmployeeExperienceVO = {
    beginTime?: string;
    endTime?: string;
    experienceDescript?: string;
    experienceName?: string;
    experienceType?: number;
    id?: number;
    jobRole?: string;
    userId?: number;
  };

  type EmployeeQualificationVO = {
    id?: number;
    qualificationName?: string;
    qualificationType?: number;
  };

  type EmployeeUpdateRequest = {
    advantage?: string;
    age?: number;
    education?: number;
    gender?: number;
    graduateYear?: number;
    jobStatus?: number;
    skillTagList?: string[];
    userId?: number;
  };

  type EmployeeVO = {
    advantage?: string;
    age?: number;
    cityId?: number;
    cityName?: string;
    education?: number;
    email?: string;
    employeeEducationList?: EmployeeEducationVO[];
    employeeExperienceList?: EmployeeExperienceVO[];
    gender?: number;
    graduateYear?: number;
    id?: number;
    jobStatus?: number;
    qualificationList?: EmployeeQualificationVO[];
    skillTagList?: string[];
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    wishCareerInfoList?: EmployeeWishCareerVO[];
  };

  type EmployeeWishCareerAddRequest = {
    cityId?: number;
    industryIdList?: number[];
    positionId?: number;
    salaryExpectation?: string;
  };

  type EmployeeWishCareerQueryRequest = {
    cityId?: number;
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    positionId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type EmployeeWishCareerUpdateRequest = {
    cityId?: number;
    id?: number;
    industryIdList?: number[];
    positionId?: number;
    salaryExpectation?: string;
  };

  type EmployeeWishCareerVO = {
    cityName?: string;
    id?: number;
    industryInfoList?: IndustryVO[];
    positionInfo?: PositionVO;
    salaryExpectation?: string;
    userId?: number;
  };

  type EmployerInfo = {
    id?: number;
    lastLogin?: number;
    positionName?: string;
    userAvatar?: string;
    userName?: string;
  };

  type EmployerQueryRequest = {
    companyId?: number;
    current?: number;
    pageSize?: number;
    positionId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    userIdList?: number[];
  };

  type EmployerUpdateRequest = {
    companyId?: number;
    positionId?: number;
    userId?: number;
  };

  type EmployerVO = {
    cityId?: number;
    cityName?: string;
    companyId?: number;
    companyName?: string;
    email?: string;
    positionName?: string;
    userAvatar?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type ExperienceAddRequest = {
    beginTime?: string;
    endTime?: string;
    experienceDescript?: string;
    experienceName?: string;
    experienceType?: number;
    jobRole?: string;
  };

  type ExperienceQueryRequest = {
    current?: number;
    experienceType?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ExperienceUpdateRequest = {
    beginTime?: string;
    endTime?: string;
    experienceDescript?: string;
    experienceName?: string;
    experienceType?: number;
    id?: number;
    jobRole?: string;
  };

  type getCompanyUsingGETParams = {
    /** companyId */
    companyId: number;
  };

  type getEducationUsingGETParams = {
    /** educationId */
    educationId: number;
  };

  type getEmployeeByIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getEmployeeWishCareerUsingGETParams = {
    /** employeeWishCareerId */
    employeeWishCareerId: number;
  };

  type getEmployerByIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getExperienceUsingGETParams = {
    /** experienceId */
    experienceId: number;
  };

  type getRecruitmentUsingGETParams = {
    /** recruitmentId */
    recruitmentId: number;
  };

  type getWishPositionUsingPOSTParams = {
    /** desc */
    desc?: string;
  };

  type IndustryVO = {
    id?: number;
    industryName?: string;
  };

  type likeOrDislikeRecruitmentCommentUsingPOSTParams = {
    /** id */
    id: number;
  };

  type MajorVO = {
    id?: number;
    majorName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCompanyVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CompanyVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEmployeeEducationVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EmployeeEducationVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEmployeeExperienceVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EmployeeExperienceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEmployeeWishCareerVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EmployeeWishCareerVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEmployerVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EmployerVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRecruitmentCommentVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RecruitmentCommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRecruitmentVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RecruitmentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PositionVO = {
    id?: number;
    positionDescript?: string;
    positionName?: string;
  };

  type publisherInfo = {
    id?: number;
    userAvatar?: string;
    userName?: string;
  };

  type QualificationDetail = {
    qualificationId?: number;
    qualificationName?: string;
  };

  type QualificationEmployeeUpdateRequest = {
    qualificationIdList?: number[];
  };

  type QualificationVO = {
    qualificationList?: QualificationDetail[];
    qualificationType?: string;
  };

  type RecruitmentAddRequest = {
    cityId?: number;
    educationType?: number;
    industryId?: number;
    jobAddress?: string;
    jobDescription?: string;
    jobKeywords?: string[];
    jobName?: string;
    jobRequirements?: string;
    jobSkills?: string[];
    jobType?: number;
    positionId?: number;
    salaryLower?: number;
    salaryUnit?: number;
    salaryUpper?: number;
  };

  type RecruitmentCommentAddRequest = {
    commentText?: string;
    recruitmentId?: number;
    star?: number;
  };

  type RecruitmentCommentQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    recruitmentId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type RecruitmentCommentVO = {
    commentText?: string;
    createTime?: string;
    hasLiked?: boolean;
    id?: number;
    likeNum?: number;
    publisherInfo?: publisherInfo;
    recruitmentId?: number;
    star?: number;
  };

  type RecruitmentQueryRequest = {
    cityIdList?: number[];
    companyId?: number;
    current?: number;
    educationType?: number;
    id?: number;
    ids?: number[];
    industryId?: number;
    jobActive?: number;
    jobKeyword?: string;
    jobType?: number;
    pageSize?: number;
    positionId?: number;
    salaryLower?: number;
    salaryUnit?: number;
    salaryUpper?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type RecruitmentUpdateRequest = {
    cityId?: number;
    educationType?: number;
    id?: number;
    industryId?: number;
    jobActive?: number;
    jobAddress?: string;
    jobDescription?: string;
    jobKeywords?: string[];
    jobName?: string;
    jobRequirements?: string;
    jobSkills?: string[];
    jobType?: number;
    positionId?: number;
    salaryLower?: number;
    salaryUnit?: number;
    salaryUpper?: number;
  };

  type RecruitmentVO = {
    cityAddress?: string;
    cityId?: number;
    companyInfo?: CompanyInfo;
    coordinateX?: number;
    coordinateY?: number;
    createTime?: string;
    educationType?: number;
    employerInfo?: EmployerInfo;
    id?: number;
    industryInfo?: IndustryVO;
    jobActive?: number;
    jobAddress?: string;
    jobDescription?: string;
    jobKeywords?: string[];
    jobName?: string;
    jobRequirements?: string;
    jobSkillList?: string[];
    jobType?: number;
    positionInfo?: PositionVO;
    salaryLower?: number;
    salaryUnit?: number;
    salaryUpper?: number;
    userId?: number;
  };

  type SchoolVO = {
    id?: number;
    schoolName?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserLoginVO = {
    cityId?: number;
    id?: number;
    token?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    cityId?: number;
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserUpdateRequest = {
    cityId?: number;
    email?: string;
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
  };
}
