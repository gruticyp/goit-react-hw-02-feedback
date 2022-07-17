import { Component } from 'react';
import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';


export default class App extends Component { 
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  countTotalFeedback = () => {
    const {bad, good, neutral} = this.state;
    const total = bad + good + neutral;
    return total;
  }
  
  onLeaveFeedback = (name) => {
    this.setState(prevState => { 
      return {
        [name]: prevState[name] + 1,
      };
    });
  };

  countPositiveFeedbackPercentage = (total) => {
    const { good } = this.state;
    const positivePercentage = Number((good / total * 100).toFixed(2));
    return positivePercentage;
  };

  render() { 
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage(total);
    const names = Object.keys(this.state);
    
    return (
      <>
      <Section title="Please leave feedback">
        <FeedbackOptions
        option={names}
        onLeaveFeedback={this.onLeaveFeedback}
        />
      </Section>
      {total ? (<Section title="Statistics">
      <Statistics
							good={good}
							neutral={neutral}
							bad={bad}
							total={total}
							positivePercentage={positivePercentage}
						/>

      </Section>) : (<Notification message="There is no feedback"/>
      )}
      </>
    );
  }
}