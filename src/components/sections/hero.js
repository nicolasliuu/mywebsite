import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Typewriter from 'typewriter-effect';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(20px), 6vw, var(40px)); /* Adjusted values */
    font-weight: 400;
  
    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    font-weight: 400;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const roles = ["Software Engineer @ uCredit", "Research Assistant @ JHU LCSR", "Data Analyst Intern @ JHU SOM", "ML Research @ JHU"]

  const one = <h1>Hi, I'm</h1>;
  const two = <h2 className="big-heading">Nicolas Liu.</h2>;
  const three = (
    <h3 className="medium-heading">
      <Typewriter
        options={{
          strings: roles,
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
          pauseFor: 1500,
        }}
      />
    </h3>
  );
  const four = (
    <>
      <p>
        Computer Science and Applied Mathematics & Statistics double major @ {' '}
        <a href="https://www.jhu.edu/" target="_blank" rel="noreferrer">
          Johns Hopkins University 
        </a>
        , exploring the intersection of technology, data, healthcare, and finance.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="/resume.pdf"
      target="_blank"
      rel="noreferrer">
      Resume
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
