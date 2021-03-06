import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { memberToogle, addMemberToogle, userInfoToogle } from 'app/shared/reducers/app';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity, reset, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import './style.scss';
import helper from 'app/shared/util/helper';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    user: { //  群信息
        MemberList: []
    };
    list: [];   //  所有群成员
    filtered: [];   //  检索后的群成员列表
    query: string;
}
class Members extends React.Component<IProps, IState> {
    messageInputRef;
    constructor(props) {
        super(props);
    }
    /**
     * 插入真实DOM完成
     * 1.初始化项目基本信息
     */
    componentDidMount() {
        this.setState({
            user: {
                MemberList: []
            },
            list: [],   //  所有群成员
            filtered: []   //  检索后的群成员列表
        });
        this.messageInputRef.value = '';
    }
    /**
     * 显示/隐藏用户信息
     */
    toggle = (show = this.props.show, user = this.state.user) => {
        this.props.memberToogle(show);
        this.setState({
            user
        });
        if (show === false) {
            this.setState({
                filtered: []
            });
            this.messageInputRef.value = '';
            return;
        }
        this.setState({
            list: user.MemberList
        });
    }
    /**
     * 快速搜索
     */
    search = (query = '') => {
        // let filtered: [] = [];
        this.setState({
            query
        });

        if (query) {
            // filtered = this.state.list.filter(e => {
            //     return han.letter(e.NickName).toLowerCase().indexOf(han.letter(query.toLocaleLowerCase())) > -1;
            // });
            // this.setState({
            //     filtered
            // });

            return;
        }
        this.setState({
            filtered: []
        });
    }

    showUserinfo = async (user: any) => {
        const caniremove = helper.isChatRoomOwner(this.props.account);

        if (user.id === this.props.account.id) {
            user = this.props.account;
        } else {
            this.props.customerRelationList.filter(e => {
                // Try to find contact in contacts
                if (e.id === user.id) {
                    return (user = e);
                }
            });
        }
        this.props.userInfoToogle(true, user, caniremove);
    }
    /**
     * 打开新增群员页面
     */
    addMember = () => {
        this.toggle(false);
        this.props.addMemberToogle(true);
    }

    render() {
        const { account } = this.props;
        if (!this.props.show) {
            return false;
        }
        return (
            <div className={'container'} >
                <header>
                    <span dangerouslySetInnerHTML={{ __html: `群【'${account.NickName}'】有 ${this.state.list.length} 成员` }} />

                    <span>
                        <i
                            className="icon-ion-android-add"
                            onClick={e => this.addMember()}
                            style={{
                                marginRight: 20
                            }} />
                        <i
                            className="icon-ion-android-close"
                            onClick={e => this.toggle(false)} />
                    </span>
                </header>

                <ul className={'list'}>
                    {
                        (this.messageInputRef.value && this.state.filtered.length === 0) && (
                            <div className={'notfound'}>
                                <img src="assets/images/crash.png" />
                                <h1>找不到匹配的人： '{this.messageInputRef.value}'</h1>
                            </div>
                        )
                    }

                    {
                        (this.messageInputRef.value ? this.state.filtered : this.state.list).map((e, index) => {
                            const pallet = [];  //  e.pallet ||
                            const frontColor = pallet[1] || [0, 0, 0];

                            return (
                                <li
                                    key={index}
                                    onClick={ev => this.showUserinfo(e)}
                                    style={{
                                        color: `rgb(
                                            ${frontColor[0]},
                                            ${frontColor[1]},
                                            ${frontColor[2]}
                                        )`
                                    }}>
                                    <div
                                        className={'cover'}
                                        style={{
                                            // backgroundImage: `url(${e.HeadImgUrl})`
                                        }} />
                                    <span
                                        className={'username'}
                                        dangerouslySetInnerHTML={{ __html: 'e.NickName' }} />
                                </li>
                            );
                        })
                    }
                </ul>

                <div className={'footer'}>
                    <input
                        ref={this.messageInputRef}
                        autoFocus={true}
                        id="messageInput"
                        maxLength={30}
                        onInput={e => this.search(this.messageInputRef.value)}
                        placeholder="请输入搜索关键字..."
                        type="text" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app, authentication, applicationProfile, chat, customerRelation }: IRootState) => ({
    show: app.isMembersShow,
    account: authentication.account,
    customerRelationList: customerRelation.entities
});
const mapDispatchToProps = { memberToogle, addMemberToogle, userInfoToogle };

//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members);
