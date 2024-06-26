---
order: 6
title: 动画系统构成
type: 动画
label: Animation
---

### 动画系统的构成

```mermaid
flowchart TD
	%% Colors %%
		linkStyle default stroke-width:1px,stroke-dasharray:3
		classDef white fill:white,stroke:#000,stroke-width:1px,color:#000
		classDef yellow fill:#fffd75,stroke:#000,stroke-width:1px,color:#000
		classDef green fill:#93ff75,stroke:#000,stroke-width:1px,color:#000

    Animator:::green --> AnimatorController:::yellow
    Animator --> AnimatorControllerParameter:::white
    AnimatorController --> AnimatorControllerLayer
    AnimatorControllerLayer --> AnimatorStateMachine
    AnimatorControllerLayer --> BlendingMode:::white
    AnimatorStateMachine --> AnimatorState
    AnimatorStateMachine --> AnimatorTransition:::white
    AnimatorState --> AnimationClip
    AnimationClip:::yellow --> AnimationCurve
    AnimationClip --> AnimationEvent:::white
    AnimationCurve --> Keyframe
    AnimationCurve --> Interpolation:::white
```

| 概念                                                            | 解释                                                                                                                                                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Animator](${api}core/Animator)                                 | 动画控制器组件，用于控制动画的播放。Animator 组件读取 AnimatorController 作为动画数据。通过 AnimatorControllerParameter 设置该 Animator 中的变量。                                               |
| [AnimatorController](${api}core/AnimatorController)             | 用于存储 Animator 组件的动画数据。一个 AnimatorController 包含多个 AnimatorControllerLayer，用于分层播放或动画叠加。                                                                             |
| AnimatorControllerParameter（开发中）                           | 动画控制器中使用的变量，使用户可以通过在脚本中改变变量以控制动画状态的切换。                                                                                                                     |
| [AnimatorControllerLayer](${api}core/AnimatorControllerLayer)   | 存储该层的动画状态机数据，混合模式以及混合的权重。多个 AnimatorControllerLayer 同时播放时可以通过设置 `blendingMode = AnimatorLayerBlendingMode.Additive` 实现动画叠加的效果。                   |
| [AnimatorStateMachine](${api}core/AnimatorStateMachine)         | 每个 AnimatorControllerLayer 中有一个 AnimatorStateMachine，用于控制动画状态的播放及状态间的切换及过渡。                                                                                         |
| [BlendingMode](${api}core/AnimatorControllerLayer#blendingMode) | 动画层的混合模式，默认为 `AnimatorLayerBlendingMode.Override` 既覆盖模式，可以通过将下面的层设置为 `AnimatorLayerBlendingMode.Additive` 实现动画叠加的效果。                                     |
| [AnimatorState](${api}core/AnimatorState)                       | AnimatorState 是 AnimatorStateMachine 的基本构成。可以控制 AnimationClip 的速度，是否循环，开始结束时间。每个 AnimatorState 需绑定一个 AnimationClip，当处于该状态时，则会播放该 AnimationClip。 |
| [AnimatorTransition](${api}core/AnimatorTransition)             | AnimatorTransition 定义了状态机何时以及如何从一个状态过渡到另一个状态。通过它可以设置两个动画状态的过渡开始时间 `exitTime`，目标状态的开始时间 `offset` 及过渡时长 `duration`。                  |
| [AnimationClip](${api}core/AnimationClip)                       | 动画片段，存储设计师制作的基于关键帧的动画数据。一个 AnimationClip 一般对应一个模型的特定动作，每个 AnimationClip 包含多个 AnimationCurve。                                                      |
| [AnimationCurve](${api}core/AnimationCurve)                     | 一个模型拥有多个骨骼，模型动画中每个骨骼实体的指定属性的动画关键帧数据存储于 AnimationCurve 中。一个 AnimationCurve 中包含多个 Keyframe 既关键帧数据。                                           |
| [AnimationEvent](${api}core/AnimationEvent)                     | AnimationEvent 可以让你在指定时间调用其同一实体绑定的脚本的回调函数.                                                                                                                             |
| [Keyframe](${api}core/KeyFrame)                                 | 存储动画关键帧数据，既指定时间实体的属性的值应是多少。                                                                                                                                           |
| [Interpolation](${api}core/AnimationCurve#interpolation)        | 动画曲线中关键帧的插值方式。既当时间在两个关键帧间时，属性的值该如何计算。                                                                                                                       |
