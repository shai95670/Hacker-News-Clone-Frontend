import { LINKS_PER_PAGE } from '../constants/constants';

const getQueryVariables = (isNewPage, pageNumber) => {
    const skip = isNewPage ? (pageNumber - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = { createdAt: 'desc' };
    return { skip, take, orderBy };
};

export {
  getQueryVariables  
};