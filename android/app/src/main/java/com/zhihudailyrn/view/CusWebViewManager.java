package com.zhihudailyrn.view;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by zhujiaming on 17/6/4.
 */

public class CusWebViewManager extends SimpleViewManager<CusWebView> {
    @Override
    public String getName() {
        return "CusWebView";
    }

    @Override
    protected CusWebView createViewInstance(final ThemedReactContext reactContext) {
        final CusWebView cusWebView = new CusWebView(reactContext);
        cusWebView.setOnScrollChangedCallback(new CusWebView.OnScrollChangedCallback() {
            @Override
            public void onScroll(int l, int t, int oldl, int oldt) {
                WritableMap nativeEvent = Arguments.createMap();
                nativeEvent.putString("message", "scrollListener");
                nativeEvent.putInt("dy", t);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        cusWebView.getId(), "topChange", nativeEvent
                );
            }
        });
        return cusWebView;
    }

    @ReactProp(name = "html")
    public void loadHtml(CusWebView webView, String html) {
        if (html.startsWith("http") || html.startsWith("https")) {
            webView.loadUrl(html);
        } else {
            webView.loadDataWithBaseURL(null, html, "text/html", "utf-8", null);
        }
    }

}
