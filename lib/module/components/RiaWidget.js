"use strict";

import React from "react";
import { ChatWithUsModal } from "./ChatWithUsModal.js";

/**
 * RiaWidget component serves as the root entry point for chatbot-related features within the application.
 * 
 * @remarks
 * This component is designed with future scalability in mind, acting as the foundational wrapper for all chatbot functionalities.
 * It currently renders the `ChatWithUsModal` component, but is intended to be extended to support additional features such as voice assistant and other interactive capabilities.
 * All future enhancements and features related to the chatbot will have their root integration within this file.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const RiaWidget = props => {
  return /*#__PURE__*/_jsx(ChatWithUsModal, {
    ...props
  });
};
//# sourceMappingURL=RiaWidget.js.map