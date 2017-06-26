package com.zhihudailyrn;

import android.webkit.WebSettings;
import android.webkit.WebView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.webview.ReactWebViewManager;
import com.facebook.react.views.webview.WebViewConfig;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhujiaming on 2017/5/26.
 */

public class CusMainReactPackage extends MainReactPackage {
    private WebViewConfig webViewConfig = new WebViewConfig() {
        @Override
        public void configWebView(WebView webView) {
            WebSettings settings = webView.getSettings();
            //do settings...
            settings.setBuiltInZoomControls(false);
            settings.setSupportZoom(false);
            settings.setDisplayZoomControls(false);
        }
    };

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> viewManagers = handleRepleaceRTCWebView(super.createViewManagers(reactContext));
        return viewManagers;
    }

    /**
     * 替换viewManager中默认的RCTWebViewManager
     */
    private List<ViewManager> handleRepleaceRTCWebView(List<ViewManager> viewManagers) {
        List<ViewManager> _viewManagers = new ArrayList<>(viewManagers);
        for (int i = 0; i < _viewManagers.size(); i++)
            if (_viewManagers.get(i).getName().equals("RCTWebView")) {
                _viewManagers.set(i, new ReactWebViewManager(webViewConfig));
                break;
            }
        return _viewManagers;
    }
}
