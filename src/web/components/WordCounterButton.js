import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(({ spacing, palette }) => ({
  info: {
    minWidth: 150,
    height: '30px',
    lineHeight: '30px',
    padding: spacing(0, 3),
    color: '#aaa',
    boxSizing: 'border-box',
  },
  text: {
    width: 24,
    height: 24,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  tooltip: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  value: {
    marginLeft: spacing(1),
    color: palette.type === 'dark' ? '#f0f0f0' : '#333',
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

function WordCounterButton(props) {
  const classes = useStyles();
  const [result, setResult] = useState({});

  function handleWordCounterResult(wordCounterResult) {
    setResult(wordCounterResult);
  }

  useEffect(() => {
    window.wizApi.userManager.on('wordCounter', handleWordCounterResult);

    return () => {
      window.wizApi.userManager.off('wordCounter', handleWordCounterResult);
    };
  }, []);

  const words = result.nWords === undefined ? '-' : `${result.nWords}`;

  return (
    <>
      <HtmlTooltip
        title={(
          <div className={classes.tooltip}>
            <Typography variant="subtitle2" color="inherit"><FormattedMessage id="labelWordsCounter" /></Typography>
            <Typography variant="caption" color="inherit"><FormattedMessage id="labelWordsCount" values={{ value: result.nWords }} /></Typography>
            <Typography variant="caption" color="inherit"><FormattedMessage id="labelAsianCount" values={{ value: result.nAsianChars }} /></Typography>
            <Typography variant="caption" color="inherit"><FormattedMessage id="labelCharsCount" values={{ value: result.nChars }} /></Typography>
            <Typography variant="caption" color="inherit"><FormattedMessage id="labelCharsWithSpaceCount" values={{ value: result.nCharsWithSpace }} /></Typography>
          </div>
        )}
        placement="left"
        classes={{
          tooltip: classes.tooltip,
        }}
      >
        <div>
          <IconButton className={props.className}>
            <div className={classes.text}>{words}</div>
          </IconButton>
        </div>
      </HtmlTooltip>
    </>
  );
}

WordCounterButton.propTypes = {
  className: PropTypes.string,
};

WordCounterButton.defaultProps = {
  className: '',
};

export default injectIntl(WordCounterButton);
