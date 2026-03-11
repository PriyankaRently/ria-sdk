"use strict";

import { StyleSheet } from "react-native";
import { hs, vs } from "theme/ui/lib";
import { RDColors, Spacings } from "theme/ui/tokens";
export const ChatWithUsModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: '100%'
  },
  backgroundContainer: {
    backgroundColor: RDColors["chat-bot"][200],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacings.x_sm
  },
  contentContainer: {
    flex: 1,
    padding: Spacings.big,
    position: 'relative'
  },
  messageArea: {
    flex: 1
  },
  indicatorStyle: {
    backgroundColor: RDColors.neutral[400],
    marginTop: Spacings.xx_sm,
    width: hs(56)
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: Spacings.sm
  },
  footerButtonContainer: {
    backgroundColor: RDColors.shades.transparent,
    paddingHorizontal: Spacings.xx_sm
  },
  sideHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacings.sm
  },
  endChatButton: {
    position: "absolute",
    top: 70,
    right: 60,
    zIndex: 1000,
    borderWidth: 1,
    padding: Spacings.xx_sm,
    borderColor: RDColors.neutral[50],
    borderRadius: vs(14),
    backgroundColor: RDColors.shades[0]
  },
  scrollViewContent: {
    paddingBottom: Spacings.md
  },
  textInput: {
    flex: 1,
    fontSize: vs(14),
    marginRight: Spacings.lg,
    marginLeft: Spacings.xx_sm,
    color: RDColors.neutral[800],
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: vs(72),
    minHeight: vs(30)
  },
  typingText: {
    marginTop: Spacings.sm
  },
  accuracyText: {
    marginHorizontal: Spacings.x_sm,
    marginTop: Spacings.sm
  }
});
//# sourceMappingURL=ChatWithUsModal.style.js.map