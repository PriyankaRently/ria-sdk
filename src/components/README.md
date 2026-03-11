# RiaAppComponent - Temporary App Code

This folder contains the original app code that was copied for reference. These files still have Redux dependencies and app-specific imports.

## Status: NOT READY FOR SDK

These files will need to be migrated to use the new Context + Provider pattern before they can be used in the SDK.

## Files in this folder:
- All components still using `react-redux`, `useDispatch`, `useSelector`
- All components importing from `theme/ui/components`, `theme/ui/tokens` (app-specific)
- All components importing from `../../../../constants/` paths (app-specific)

## Migration Plan:
1. Update all components to use `useRiaChatBot` instead of Redux
2. Replace app-specific imports with SDK equivalents
3. Remove dependencies on external app code

## Current SDK Components (Ready to Use):
The SDK components in `/src/components/` are already updated and ready:
- `AiDisclaimer.tsx`
- `ChatbotBadges.tsx`
- `ChatbotLoader.tsx`
- `ChatMessageText.tsx`
- `ChatWidgetIcon.tsx`
- `ChatWithUsModal.tsx`
- `MessageInput.tsx`
- `PopupBubbleText.tsx`
- `RiaWidget.tsx`
- `TypingDotsComponent.tsx`

These SDK components should be used instead of the ones in `riaAppComponent`.
