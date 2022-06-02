import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  name: string;
};

const ProjectImage = ({ isActive = false }) => {
  return (
    <motion.div
      animate={{
        backgroundColor: isActive ? "#AAA" : "#EEE",
      }}
    >
      <img width="10" height="16" className="w-full invisible" />
    </motion.div>
  );
};

const ProjectInfo = ({ children = "" }) => (
  <div>
    {children.split(" ").map((item) => (
      <div className="text-xs">{item}</div>
    ))}
  </div>
);

const ProjectDescription = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Project = ({ name }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [preferViewInfo, setPreferViewInfo] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const boundingRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px -15% 0px",
      // threshold: 0.5,
      threshold: [0, 0.4, 0.7, 1],
    };

    const observer = new IntersectionObserver((entries, observer) => {
      const ratio = entries[0].intersectionRatio;

      if (ratio < 1) {
        setIsInView(false);
        return;
      }
      setIsInView(true);
    }, options);

    observer.observe(boundingRef.current);
    return () => {
      observer.unobserve(boundingRef.current);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setPreferViewInfo(false);
      console.log("scroll triggered");
    }
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    if (preferViewInfo) {
      // setIsActive(false);
      return;
    }
    if (!isInView) {
      setPreferViewInfo(true);
      setIsActive(false);
      return;
    }
    setIsActive(true);
    setPreferViewInfo(false);
  }, [isInView, preferViewInfo]);

  const handleDescriptionClick = () => {
    setPreferViewInfo(!preferViewInfo);
  };

  return (
    <motion.div ref={boundingRef} className="text-sm leading-none">
      <ProjectImage isActive={isActive} />
      <div
        style={{
          position: "relative",
          marginTop: ".7rem",
        }}
        onClick={handleDescriptionClick}
      >
        <motion.div
          animate={{
            opacity: preferViewInfo ? 0.5 : 0,
            y: preferViewInfo ? 0 : -20,
          }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
        >
          <ProjectInfo>2022 Identity Naming Positioning</ProjectInfo>
        </motion.div>
        <motion.div
          animate={{
            position: "absolute",
            top: 0,
            opacity: !preferViewInfo ? 1 : 0,
            y: !preferViewInfo ? 0 : 20,
          }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
        >
          <ProjectDescription>
            <h4 className="font-bold">{name}</h4>
            <p className="opacity-70 mt-1 text-xs">
              The parent company to Hyper and Product Hunt.
            </p>
          </ProjectDescription>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Project;
