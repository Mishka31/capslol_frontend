import styled from "styled-components";
import { colors, fonts } from "constants/index";

export const Page = styled.div`
  padding: 12px;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: ${fonts.jobListFontWeight};
  font-size: ${fonts.jobListTitleSize};
  color: ${colors.brandColor};
`;

export const JobsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 16px;
  border-top: 1px solid ${colors.appBarBrd};
`;

export const ListContainer = styled.div`
  width: 60vw;
  border-right: 1px solid ${colors.appBarBrd};
`;

export const JobsList = styled.ul`
  padding-right: 12px;
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

export const JobCard = styled.li`
  padding: 24px 8px 8px 8px;
  background-color: ${colors.appBarBgr};
  border-bottom: 1px solid ${colors.appBarBrd};
  color: ${colors.textWhite};
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-left: 16px;
  background-color: ${colors.appBarBgr};
`;