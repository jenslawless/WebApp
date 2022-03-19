import { Ballot } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import styled from '@mui/material/styles/styled';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import historyPush from '../common/utils/historyPush';
import { isCordova } from '../common/utils/isCordovaOrWebApp';
import { renderLog } from '../common/utils/logging';
import { PageContentContainer } from '../components/Style/pageLayoutStyles';


class PageNotFound extends Component {
  static getProps () {
    return {};
  }

  render () {
    renderLog('PageNotFound');  // Set LOG_RENDER_EVENTS to log all renders
    if (isCordova()) {
      console.log(`PageNotFound window.location.href: ${window.location.href}`);
    }
    const { classes } = this.props;
    return (
      <PageContentContainer>
        <div className="container-fluid">
          <Helmet title="Page Not Found - We Vote" />
          <Wrapper>
            <Card>
              <EmptyBallotMessageContainer>
                <EmptyBallotText>Page not found.</EmptyBallotText>
                <Button
                  classes={{ root: classes.ballotButtonRoot }}
                  color="primary"
                  variant="contained"
                  onClick={() => historyPush('/ballot')}
                >
                  <Ballot classes={{ root: classes.ballotButtonIconRoot }} location={window.location} />
                  Go to Ballot
                </Button>
              </EmptyBallotMessageContainer>
            </Card>
          </Wrapper>
        </div>
      </PageContentContainer>
    );
  }
}
PageNotFound.propTypes = {
  classes: PropTypes.object,
};

const Wrapper = styled('div')`
  @media (max-width: ${(theme) => (isCordova() ? undefined : theme.breakpoints.md)}) {
    margin: 1em 0;
  }
`;

const EmptyBallotMessageContainer = styled('div')`
  padding: 3em 2em;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const EmptyBallotText = styled('p')`
  font-size: 24px;
  text-align: center;
  margin: 1em 2em 3em;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 1em;
  }
`;

const styles = (theme) => ({
  ballotIconRoot: {
    width: 150,
    height: 150,
    color: 'rgb(171, 177, 191)',
  },
  ballotButtonIconRoot: {
    marginRight: 8,
  },
  ballotButtonRoot: {
    width: 250,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});

export default withStyles(styles)(PageNotFound);
