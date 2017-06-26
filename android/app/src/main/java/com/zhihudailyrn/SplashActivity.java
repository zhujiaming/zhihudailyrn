package com.zhihudailyrn;

import android.animation.ValueAnimator;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.bumptech.glide.Glide;

public class SplashActivity extends AppCompatActivity {

    private Handler handler = new Handler();
    private LinearLayout llBottom;
    private ImageView iv;
    private CusProgressBar icon;

    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
            finish();
        }
    };
    private int llBottomHeight;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        iv = (ImageView) findViewById(R.id.iv);
        llBottom = (LinearLayout) findViewById(R.id.ll_bottom);
        icon = (CusProgressBar) findViewById(R.id.icon);
    }

    @Override
    protected void onResume() {
        super.onResume();
        startBottomAnim();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                icon.start();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Glide.with(SplashActivity.this).load(R.mipmap.splash).crossFade().into(iv);
                        handler.postDelayed(runnable, 4000);
                    }
                }, 1000);
            }
        }, 500);
    }

    private void startBottomAnim() {
        llBottomHeight = llBottom.getLayoutParams().height;
        ValueAnimator progressAnimator = ValueAnimator.ofInt(-llBottomHeight, 0);
        progressAnimator.setDuration(500);
        progressAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {

            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                int value = (int) animation.getAnimatedValue();
                RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) llBottom.getLayoutParams();
                params.bottomMargin = value;
                llBottom.setLayoutParams(params);
            }
        });
        progressAnimator.start();
    }


}
