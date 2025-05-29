import React, { useState } from 'react';
import { Upload, message, Typography, Button, Card, Tag, Space, Row, Col } from 'antd';
import { InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import TimoBackground from './assets/Timo.png';
import championMeta from './champion_meta.json';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const App = () => {
  const [genderLabel, setGenderLabel] = useState('알 수 없음');
  const [result, setResult] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:8000/upload',
    showUploadList: false,
    onChange(info) {
      const { status, response } = info.file;

      if (status === 'done') {
        message.success(`${info.file.name} 업로드 성공!`);
        if (response?.top_matches) {
          setResult(response);
          setMainIndex(0);
          const g = response.gender?.toLowerCase();
          setGenderLabel(g === 'man' ? '남자' : g === 'woman' ? '여자' : '알 수 없음');
        } else {
          message.warning('얼굴을 찾을 수 없습니다.');
          setResult(null);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} 업로드 실패.`);
        setResult(null);
      }
    },
  };

  const resetResult = () => {
    setResult(null);
    setMainIndex(0);
  };

  const renderMainCard = (champ) => {
    const champName = champ.name.replace('.png', '');
    const meta = championMeta[champName] || {};

    return (
      <Card
        hoverable
        style={{ width: '100%', maxWidth: 450, margin: '0 auto', marginBottom: '30px' }}
        cover={<img alt={champName} src={`/champions/${champ.name}`} style={{ objectFit: 'cover', height: '320px' }} />}
      >
        <Title level={2}>{champName}</Title>
        <Text strong>매칭률:</Text> <Text>{(champ.score * 100).toFixed(2)}%</Text><br />
        <Text strong>역할:</Text> <Text>{meta.role || '알 수 없음'}</Text><br />
        <Text strong>포지션:</Text> <Text>{(meta.position || ['알 수 없음']).join(', ')}</Text><br />
        <Text strong>태그:</Text> <Space>{(meta.tags || []).map(t => <Tag key={t} color="blue">{t}</Tag>)}</Space><br /><br />
        <Text italic type="secondary">"{meta.quote || '정보 없음'}"</Text>
      </Card>
    );
  };

  const renderSubCards = () => {
    return (
      <Row gutter={[16, 16]} justify="center" style={{ padding: '10px 0' }}>
        {result.top_matches.slice(0, 6).map((champ, idx) => (
          <Col key={champ.name}>
            <Card
              hoverable
              onClick={() => setMainIndex(idx)}
              style={{
                width: 140,
                border: mainIndex === idx ? '2px solid #1890ff' : undefined,
              }}
              cover={<img alt={champ.name} src={`/champions/${champ.name}`} style={{ objectFit: 'cover', height: '120px' }} />}
            >
              <Text strong>{champ.name.replace('.png', '')}</Text><br />
              <Text>{(champ.score * 100).toFixed(1)}%</Text>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${TimoBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // ✅ 배경 고정
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 'bold' }}>MatchMyChampion</h1>
        <p style={{ margin: 0, fontSize: '20px' }}>Who Is Your Champ?</p>
      </div>

      <div
        style={{
          width: '90%',
          maxWidth: '900px',
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={2}>리그 챔피언 닮은꼴 찾기</Title>
          {result && (
            <Text type="secondary" style={{ fontSize: '16px' }}>
              감지된 성별: {genderLabel}
            </Text>
          )}
        </div>

        {!result ? (
          <Dragger {...uploadProps} className="upload-box">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '48px', color: '#40a9ff' }} />
            </p>
            <p>사진 파일을 여기에 드래그하거나 클릭하세요</p>
            <p>JPG, PNG 등 이미지 파일만 업로드 가능합니다.</p>
          </Dragger>
        ) : (
          <>
            {renderMainCard(result.top_matches[mainIndex])}
            {renderSubCards()}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button type="primary" icon={<ReloadOutlined />} onClick={resetResult}>
                다시 테스트 하기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;