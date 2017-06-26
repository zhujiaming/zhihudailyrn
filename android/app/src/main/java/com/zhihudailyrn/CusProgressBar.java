package com.zhihudailyrn;

import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by zhujiaming on 17/6/24.
 */

public class CusProgressBar extends View {

    private int BORDER_WIDTH = dipToPx(3);
    private int ARC_MARGIN = dipToPx(40);
    private int ARC_WIDTH = dipToPx(15);
    private float currentAngle = 0f;
    private int borderColor = Color.parseColor("#C2C5CC");
    private Paint p;
    private RectF rect;
    private Paint p2;
    private RectF rect2;
    private Paint allArcPaint;
    private RectF rect3;
    private int measuredWidth;
    private int measuredHeight;

    public CusProgressBar(Context context) {
        super(context);
        initView();
    }

    public CusProgressBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        initConfig(context, attrs);
        initView();
    }

    public CusProgressBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initConfig(context, attrs);
        initView();
    }

    private void initConfig(Context context, AttributeSet attrs) {
//        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.CusProgressBar);
        try {
//            BORDER_WIDTH = a.getLayoutDimension(R.styleable.CusProgressBar_android_border_width, -1);
//            ARC_MARGIN = a.getLayoutDimension(R.styleable.CusProgressBar_android_arc_margin, -1);
//            ARC_WIDTH = a.getLayoutDimension(R.styleable.CusProgressBar_android_arc_width, -1);
        } finally {
//            a.recycle();
        }
    }

    private void initView() {

        //拿画笔
        p = new Paint();
        p.setColor(borderColor);
        p.setStyle(Paint.Style.FILL);
        p.setAntiAlias(true);// 设置画笔的锯齿效果
//        rect = new RectF(0, 0, measuredWidth, measuredHeight);

        p2 = new Paint();
        p2.setColor(Color.parseColor("#17181A"));
        p2.setStyle(Paint.Style.FILL);
        p2.setAntiAlias(true);// 设置画笔的锯齿效果
//        rect2 = new RectF(BORDER_WIDTH, BORDER_WIDTH, measuredWidth - BORDER_WIDTH, measuredHeight - BORDER_WIDTH);


        allArcPaint = new Paint();
        allArcPaint.setAntiAlias(true);
        allArcPaint.setStyle(Paint.Style.STROKE);
        allArcPaint.setColor(Color.parseColor("#C2C5CC"));
        allArcPaint.setStrokeCap(Paint.Cap.ROUND);
        // 设置个新的长方形
//        rect3 = new RectF(ARC_MARGIN + BORDER_WIDTH, ARC_MARGIN + BORDER_WIDTH, dipToPx(200) - BORDER_WIDTH - ARC_MARGIN, dipToPx(200) - BORDER_WIDTH - ARC_MARGIN);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        measuredWidth = measureModeAndSize(widthMeasureSpec);
        measuredHeight = measuredWidth;

        BORDER_WIDTH = (int) (measuredWidth * 0.02);
        ARC_MARGIN = (int) (measuredWidth * 0.2);
        ARC_WIDTH = (int) (measuredWidth * 0.09);

        rect = new RectF(0, 0, measuredWidth, measuredHeight);
        rect2 = new RectF(BORDER_WIDTH, BORDER_WIDTH, measuredWidth - BORDER_WIDTH, measuredHeight - BORDER_WIDTH);
        rect3 = new RectF(ARC_MARGIN + BORDER_WIDTH, ARC_MARGIN + BORDER_WIDTH, measuredWidth - BORDER_WIDTH - ARC_MARGIN, measuredWidth - BORDER_WIDTH - ARC_MARGIN);

        allArcPaint.setStrokeWidth(ARC_WIDTH);

        setMeasuredDimension(measuredWidth, measuredHeight);
    }


    @Override
    protected void onDraw(Canvas canvas) {

        canvas.drawRoundRect(rect, 25, 25, p);

        //绘制里面的圆角矩形
        canvas.drawRoundRect(rect2, 25, 25, p2);

        //绘制圆弧
        canvas.drawArc(rect3, 90, currentAngle, false, allArcPaint);
        invalidate();
    }

    public void start() {
        setAnimation(0, 270, 1000);
    }


    private int measureModeAndSize(int measureSpec) {
        int size = 0;
        int specModeWidth = MeasureSpec.getMode(measureSpec);
        int specSizeWidth = MeasureSpec.getSize(measureSpec);

        if (specModeWidth == MeasureSpec.EXACTLY) {
            size = specSizeWidth;
        } else {
            size = dipToPx(70);                         //wrap_content MeasureSpec.UNSPECIFIED
            if (specModeWidth == MeasureSpec.AT_MOST) { //match_parent
                size = Math.min(size, specSizeWidth);
            }
        }
        return size;
    }


    private void setAnimation(float last, final float current, int length) {
        ValueAnimator progressAnimator = ValueAnimator.ofFloat(last, current);
        progressAnimator.setDuration(length);
        progressAnimator.setTarget(currentAngle);
        progressAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {

            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                currentAngle = (float) animation.getAnimatedValue();
            }
        });
        progressAnimator.start();
    }

    /**
     * dip 转换成px
     *
     * @param dip
     * @return
     */
    private int dipToPx(float dip) {
        float density = getContext().getResources().getDisplayMetrics().density;
        return (int) (dip * density + 0.5f * (dip >= 0 ? 1 : -1));
    }
}
