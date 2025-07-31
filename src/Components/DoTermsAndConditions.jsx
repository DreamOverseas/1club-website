/**
 * This T&C component is meant to be able to put in any React websites for DO
 * So I'm not using any 3-rd party libs out of React
 * Sample Usage (as I first used in WCO Website):
 * <div className='text-sm text-right'>
 *    请仔细阅读我们的 <DoTermsAndConditions defaultLang='en'/>
 * </div>
*/
// src/<components folder>/DoTermsAndConditions.jsx

import React, { useState } from 'react';

const DoTermsAndConditions = ({ defaultLang = 'zh' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState(defaultLang);

    const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');
    const toggleModal = () => setIsOpen(!isOpen);

    const zhContent = `任何使用一号俱乐部（1# Club）网站的用户均应仔细阅读本条例。1# Club 是由出国梦集团（Dream Overseas Group Pty Ltd - ABN: 531 191 108 60）运营的线上平台：

- 服务协议
第1条：服务条款的接受
1、本服务条款所称的服务商、合作方是指完全同意所有条款并使用出国梦集团及其平台（包括但不限于一号俱乐部）各项软件服务（以下称为“本服务”）的出国服务商、合作方及其他用户（以下称为“服务商、合作方”）。通过开通服务应用软件，服务商、合作方便表明其接受并同意受本服务条款及其他声明的约束；同时，服务商、合作方保证其提交的信息真实、合法、有效、准确、及时和完整。
2、本服务条款以《出国梦集团用户服务协议》为基础，服务商、合作方接受本服务条款，默认表示接受《出国梦集团用户服务协议》及其他全部声明等的相关条款。

第2条：服务条款的变更和修改
1、出国梦集团提供的软件服务包括但不限于服务商、合作方委托、合作开单、项目分享、运营管理、操作等服务功能，服务商、合作方在开通这些服务功能时，表明其已经了解相关产品的功能以及使用规则，并愿意接受。
2、出国梦集团有权利根据软件的使用情况，进行功能的新增、修改和删减。

第3条：服务说明
1、出国梦集团通过自己的计算机系统经由互联网向服务商、合作方提供包括1# Club 在内的营销软件服务。
2、除非另有明确规定，增强或改变目前服务的任何新功能，包括新产品，均适用本服务条款。出国梦集团不保证服务一定会满足使用者需求，也不对服务的连续性、安全性、准确性作出担保。
3、出国梦集团不对服务商、合作方在使用过程中与第三方产生的纠纷负责。
4、在以下情况下，出国梦集团有权删除相关信息或终止服务：
    4.1 服务商、合作方违反《出国梦集团用户服务协议》；
    4.2 应服务商、合作方要求；
    4.3 服务商、合作方违反服务规则。

第4条：有偿服务说明
服务商、合作方在支付服务费用时应确认账号及选项，若因误操作或非法方式支付导致权益受损，出国梦集团不承担责任。若用户主动终止服务，不退还费用；若因出国梦集团原因中止，将酌情退还剩余费用。

第5条：法律的适用和管辖
本服务条款适用中华人民共和国法律。若部分条款无效，不影响其他条款的效力。用户同时需遵守《互联网电子公告服务管理规定》和《互联网信息服务管理办法》。

第6条：冲突选择
本服务条款为法律文件，若存在与其他声明不一致的情况，以本条款为准，除非被官方声明废止或更新。

第7条：条款的生效
除非另行通知，本服务条款自2025年1月1日起生效。

第8条：数据上传与使用
1、用户在1# Club 平台上传的内容（如文本、图像、视频、评论、资料等），一经上传即视为用户授权出国梦集团在全球范围内无偿、非独占、可再授权地使用、复制、修改、展示、发布该等内容。
2、用户须确保上传内容不侵犯他人合法权益。若发生侵权，用户承担全部法律责任，并赔偿出国梦集团因此遭受的损失。
3、出国梦集团有权根据平台内容管理规定对上传内容进行筛选、编辑、删除等处理。

第9条：会员与登录机制
1、1# Club 提供注册会员功能。用户需提供真实、合法的身份信息进行注册。
2、会员账户仅限本人使用，不得转让、出租、出借。用户对账户操作及安全性负责。
3、出于安全、运营或用户违规的原因，出国梦集团有权暂停或注销会员账户。
4、特定功能或服务可能仅限注册会员使用，具体权限以平台公布为准。

- 免责声明
1、1# Club 网站发布或转载的内容由用户提供，其真实性、准确性和合法性由发布者承担。
2、出国梦集团作为平台方，不对内容作任何保证或承担法律责任。
3、若因用户上传内容侵犯他人权利，由上传者承担责任，网站不承担法律责任。
4、因黑客攻击、通讯故障等导致服务中断的，出国梦集团不承担法律责任。
5、任何使用本平台视为已知晓并同意本条款及声明的约束。
6、未尽事宜参照国家法律法规，若有冲突，以国家法律为准。
7、本声明的最终解释权归出国梦集团所有。

- 版权声明
本网站由出国梦集团（Dream Overseas Group Pty Ltd - ABN: 531 191 108 60）提供技术与内容支持。
1、本网站所有内容（包括文字、商标、图像、程序代码、设计等）著作权归出国梦集团所有。
2、未经授权，任何个人或组织不得擅自复制、转载、修改、散播或用于任何商业/非商业用途。
3、用户上传内容的署名权归原作者所有，上传即视为授权出国梦集团合理使用、编辑、修改，并保证不侵权。
4、转载本网站内容需经原作者授权，并注明来源为“出国梦集团网站”。
5、如有非法转载，出国梦集团保留追究法律责任的权利。`;

    const enContent = `All users of the 1# Club website are advised to read these Terms and Conditions carefully. 1# Club is operated by Dream Overseas Group Pty Ltd (ABN: 531 191 108 60):

I. Service Agreement

Article 1: Acceptance of Terms
“Service Providers” and “Partners” refer to all users who accept the full terms herein and utilize software services provided by Dream Overseas Group, including 1# Club. By enabling service applications, users agree to be bound by these terms and ensure the accuracy and legality of the information they submit.

Article 2: Modification of Terms
Dream Overseas Group may update, add, or remove features of its software services—including those offered on 1# Club—based on operational needs. Users agree to abide by these changes.

Article 3: Description of Services
Dream Overseas Group offers its services online, including marketing, project management, and other software functions. The use of services implies acceptance of these Terms. The Group does not guarantee uninterrupted, secure, or error-free services and is not liable for disputes between users and third parties.

Article 4: Paid Services
Users must verify account and payment selections carefully. Dream Overseas Group is not responsible for losses due to user mistakes or use of unauthorized payment methods. No refund will be issued for voluntary cancellations. If termination is caused by the company, a pro-rata refund will be considered.

Article 5: Governing Law
These Terms are governed by the laws of the People’s Republic of China. In case of conflict with national law, the latter shall prevail. Users also agree to comply with relevant internet regulations.

Article 6: Conflict Resolution
These Terms take precedence over any inconsistent statements, unless officially amended or replaced by Dream Overseas Group.

Article 7: Effective Date
These Terms take effect from Jan 1, 2025, unless otherwise stated.

Article 8: Data Upload and Use
Users uploading content (text, images, videos, etc.) to the 1# Club platform grant Dream Overseas Group a global, royalty-free license to use, edit, and display the content. Users must ensure their content does not infringe on third-party rights. The platform reserves the right to remove or edit user-submitted content.

Article 9: Membership and Login
1# Club allows account registration. Users must submit valid and truthful information. Accounts are non-transferable. Dream Overseas Group reserves the right to suspend or cancel accounts in case of violations or security concerns. Some features are accessible to registered members only.

II. Disclaimer
Content published on the 1# Club website is provided by users. Dream Overseas Group is not responsible for the accuracy or legality of such content. Any disputes or infringements are the sole responsibility of the content provider. Dream Overseas Group is not liable for technical disruptions or damages resulting therefrom. Use of the site implies acceptance of all statements and conditions.

III. Copyright Notice
This site is supported by Dream Overseas Group Pty Ltd. All content (including text, images, code, and design) is the intellectual property of the Group. Unauthorized reproduction, distribution, or commercial use is prohibited. User-submitted content remains the property of the original author, but uploading grants Dream Overseas Group permission to edit and use it. Reuse by third parties requires permission from the original author and must cite the source. Legal action may be taken against unauthorized use.
`;

    return (
        <>
            <button type="button" style={styles.linkButton} onClick={toggleModal}>{lang === 'zh' ? "服务条款" : "Terms & Conditions"}</button>
            {isOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <div style={styles.header}>
                            <button type="button" style={styles.langSwitch} onClick={toggleLang}>{lang === 'zh' ? 'English' : '中文'}</button>
                            <b>{lang === 'zh' ? "服务条款" : "Terms & Conditions"}</b>
                            <button type="button" style={styles.closeBtn} onClick={toggleModal}>×</button>
                        </div>
                        <div style={styles.content}>{lang === 'zh' ? zhContent : enContent}</div>
                        <button type="button" style={styles.confirmBtn} onClick={toggleModal}>{lang === 'zh' ? "确定" : "Comfirm"}</button>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    linkButton: {
        color: 'black', // Modified
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontSize: 'smaller' // Modified, too
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        textAlign: 'left',
        display: 'block',
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '8px',
        padding: '1rem',
        flexDirection: 'column',
        position: 'relative'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#888'
    },
    langSwitch: {
        background: 'none',
        border: '1px solid #888',
        borderRadius: '4px',
        padding: '0.2rem 0.5rem',
        fontSize: '0.9rem',
        cursor: 'pointer'
    },
    content: {
        flexGrow: 1,
        whiteSpace: 'pre-wrap',
        marginBottom: '1rem',
        fontSize: '0.95rem',
        maxHeight: '60vh',
        overflowY: 'auto',
        color: '#333'
    },
    confirmBtn: {
        width: '100%',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        padding: '0.5rem',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};

export default DoTermsAndConditions;
